import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../core/service/opentok.service';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { Room } from '../../core/model/room';
import * as HLS from 'hls.js';
import { ActionTypes, GetStreamUrlAction, SubscribeAction, UnsubscribeAction } from '../../public/room/room.actions';
import { RoomState } from '../../public/room/room.state';
import { distinctUntilChanged } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

const getStreamUrl = createSelector(
  (state: State) => state.room,
  (state: RoomState) => state.streamUrl
);

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {

  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  session: OT.Session;
  stream: OT.Stream;
  isOffline = true;
  viewersCount = 0;
  @Input()
  room: Room;
  inviteLink: string;
  inFullScreen = false;
  isSafari = false;
  hls;
  video;

  constructor(private opentokService: OpentokService, private changeDetector: ChangeDetectorRef,
              private store: Store<State>, private actions: Actions) {
  }

  @HostListener('window:beforeunload', ['$event'])
  async beforeUnloadHander(event) {
    this.store.dispatch(new UnsubscribeAction({roomId: this.room.id}));
    await this.actions.pipe(ofType(ActionTypes.DELETE_SUBSCRIBER_SUCCESS, ActionTypes.DELETE_SUBSCRIBER_ERROR))
      .toPromise().then(() => {
        this.session.disconnect();
        return true;
      });
  }

  ngOnInit(): void {
    document.addEventListener('webkitfullscreenchange', () => {
      this.inFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null);
    });
    this.inviteLink = window.location.href;
    this.store.dispatch(new SubscribeAction({roomId: this.room.id}));
    this.actions.pipe(ofType(ActionTypes.ADD_SUBSCRIBER_SUCCESS)).subscribe(() => {
      this.session = this.opentokService.initSession(this.room.api_key, this.room.session_id);
      this.session.on('sessionConnected', event => {
        if (event.target['streams'].length() !== 0) {
          this.store.dispatch(new GetStreamUrlAction({roomId: this.room.id}));
        }
      });
      this.session.on('connectionCreated', event => {
        this.viewersCount++;
        this.changeDetector.detectChanges();
      });
      this.session.on('connectionDestroyed', event => {
        this.viewersCount++;
        this.changeDetector.detectChanges();
      });
      this.opentokService.connect(this.session, this.room.token).then(() => {
        this.session.on('streamCreated', event => {
          this.store.dispatch(new GetStreamUrlAction({roomId: this.room.id}));
        });
        this.session.on('streamDestroyed', event => {
          this.isOffline = true;
          if (HLS.isSupported()) {
            this.hls.stopLoad();
          } else
          // safari
          if (this.video.canPlayType('application/vnd.apple.mpegURL')) {
            this.isSafari = true;
            this.video.src = '';
          }
          this.changeDetector.detectChanges();
        });
        this.changeDetector.detectChanges();
        this.store.pipe(select(getStreamUrl), distinctUntilChanged()).subscribe(url => {
          if (url) {
            this.subscribe(url);
          }
        });
      }).catch(alert);
    });
  }

  changeFullScreen() {
    if (!this.inFullScreen) {
      const elem = document.getElementsByClassName('subscriber').item(0);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  private subscribe(url: string) {
    this.video = (document.getElementById('video') as HTMLVideoElement);
    // not safari
    if (HLS.isSupported()) {
      this.hls = new HLS();
      this.hls.loadSource(url);
      this.hls.attachMedia(this.video);
      this.hls.on(HLS.Events.MANIFEST_PARSED, () => this.video.play());
      this.isOffline = false;
    } else
    // safari
    if (this.video.canPlayType('application/vnd.apple.mpegURL')) {
      this.isOffline = false;
      this.isSafari = true;
      this.video.src = url;
    }
  }
}
