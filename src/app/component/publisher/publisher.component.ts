import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { OpentokService } from '../../core/service/opentok.service';
import * as OT from '@opentok/client';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { Room } from '../../core/model/room';
import {
  ActionTypes,
  GetSubscribersAction,
  StartBroadcastAction,
  StopBroadcastAction
} from '../../public/room/room.actions';
import { RoomState } from '../../public/room/room.state';
import { distinctUntilChanged } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

const getBroadcastOnline = createSelector(
  (state: State) => state.room,
  (state: RoomState) => state.broadcastOnline
);

const getSubscribers = createSelector(
  (state: State) => state.room,
  (state: RoomState) => state.subscribers
);

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  session: OT.Session;
  publisher: OT.Publisher;
  publishing = false;
  viewersCount = -1;
  stream: OT.Stream;
  inviteLink: string;
  @Input()
  room: Room;
  inFullScreen = false;
  subscribers = this.store.pipe(select(getSubscribers), distinctUntilChanged());
  disabled = false;
  temporaryDisabling = false;

  constructor(private opentokService: OpentokService, private store: Store<State>, private actions: Actions) {
  }

  // @HostListener('window:beforeunload', ['$event'])
  // async beforeUnloadHander(event) {
  //   this.store.dispatch(new StopBroadcastAction({roomId: this.room.id}));
  // }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.store.dispatch(new StopBroadcastAction({roomId: this.room.id}));
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    this.store.dispatch(new StopBroadcastAction({roomId: this.room.id}));
  }

  publish() {
    if (this.isAvailableToPublish()) {
      this.disabled = true;
      this.store.dispatch(new StartBroadcastAction({roomId: this.room.id}));
      this.actions.pipe(ofType(ActionTypes.BROADCAST_START_SUCCESS, ActionTypes.BROADCAST_START_ERROR)).subscribe(() => {
        this.session.publish(this.publisher, err => {
          if (err) {
            alert(err.message);
          } else {
            this.publishing = true;
          }
          this.disabled = false;
        });
      });
      this.actions.pipe(ofType(ActionTypes.BROADCAST_START_ERROR)).subscribe(() => {
        this.disabled = false;
      });
    }
  }

  unpublish() {
    if (this.isAvailableToUnpublish()) {
      this.disabled = true;
      this.store.dispatch(new StopBroadcastAction({roomId: this.room.id}));
      this.actions.pipe(ofType(ActionTypes.BROADCAST_STOP_SUCCESS)).subscribe(() => {
        this.publishing = false;
        this.temporaryDisabling = true;
        this.session.unpublish(this.publisher);
        // this.session.disconnect();
        // this.session = OT.initSession(this.room.api_key, this.room.session_id);
        // this.opentokService.connect(this.session, this.room.token).catch(err => alert(err.message));
        // this.session.forceUnpublish(this.publisher.stream, err => {
        //   if (!err) {
        //     this.publishing = false;
        //     this.session.disconnect();
        //   }
        // });
        this.disabled = false;
      });
      this.actions.pipe(ofType(ActionTypes.BROADCAST_STOP_ERROR)).subscribe(() => {
        this.disabled = false;
      });
    }
  }

  isAvailableToPublish() {
    return !!(this.session && this.session['isConnected']()) && !this.publishing;
  }

  isAvailableToUnpublish() {
    return this.publishing;
  }

  ngOnInit() {
    document.addEventListener('webkitfullscreenchange', () => {
      this.inFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null);
    });
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: 'append',
      resolution: '1280x720', width: '100%',
      height: '100%',
      name: this.room.title,
      publishAudio: true,
      publishVideo: true
    });
    this.publisher.on('streamDestroyed', event => {
      event.preventDefault();
    });
    this.publisher.on('streamCreated', event => {
      this.stream = event.stream;
    });
    this.session = this.opentokService.initSession(this.room.api_key, this.room.session_id);
    this.session.on('connectionCreated', event => {
      this.store.dispatch(new GetSubscribersAction({roomId: this.room.id}));
      this.viewersCount++;
    });
    this.session.on('connectionDestroyed', event => {
      this.store.dispatch(new GetSubscribersAction({roomId: this.room.id}));
      this.viewersCount--;
    });
    this.opentokService.connect(this.session, this.room.token).catch(err => alert(err.message));
    this.inviteLink = window.location.href;
  }

  changeFullScreen() {
    if (!this.inFullScreen) {
      const elem = document.getElementsByClassName('publisher').item(0);
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
}
