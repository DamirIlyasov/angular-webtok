import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../core/service/opentok.service';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { RoomState } from '../../public/room/room.state';
import { Room } from '../../core/model/room';
import { distinctUntilChanged } from 'rxjs/operators';
import * as HLS from 'hls.js';

const getRoom = createSelector(
  (state: State) => state.room,
  (state: RoomState) => state.room
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
  subscriber;
  isOffline = true;
  viewersCount = 0;
  room: Room;
  inviteLink: string;
  document = document;
  inFullScreen = false;

  constructor(private opentokService: OpentokService, private changeDetector: ChangeDetectorRef,
              private store: Store<State>) {
  }

  ngOnInit(): void {
    document.addEventListener('webkitfullscreenchange', () => {
      this.inFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null);
      // ||
      // (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      // (document.msFullscreenElement && document.msFullscreenElement !== null);
    });
    this.inviteLink = window.location.href;
    this.store.pipe(
      select(getRoom),
      distinctUntilChanged()
    ).subscribe((room: Room) => {
      if (room) {
        this.room = room;
        this.session = this.opentokService.initSession(room.apiKey, room.sessionId);
        this.session.on('sessionConnected', event => {
          if (event.target['streams'].length() !== 0) {
            this.subscribe(event.target['streams'].find());
          }
        });
        this.session.on('connectionCreated', event => {
          this.viewersCount++;
        });
        this.session.on('connectionDestroyed', event => {
          this.viewersCount--;
        });
        this.opentokService.connect(this.session, this.room.token).then(() => {
          this.session.on('streamCreated', event => {
            this.subscribe(event.stream);
          });
          this.session.on('streamDestroyed', event => {
            this.isOffline = true;
            this.changeDetector.detectChanges();
          });
          this.changeDetector.detectChanges();
        }).catch(alert);
      }
    });
  }

  changeFullScreen() {
    if (!this.inFullScreen) {
      const elem = document.getElementsByClassName('subscriber').item(0);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      // else if (elem.mozRequestFullScreen) { /* Firefox */
      //   elem.mozRequestFullScreen();
      // }
      else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      }
      // else if (elem.msRequestFullscreen) { /* IE/Edge */
      //   elem.msRequestFullscreen();
      // }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      // else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen();
      // } else if (document.msExitFullscreen) {
      //   document.msExitFullscreen();
      // }
    }
  }

  private subscribe(stream: OT.Stream) {
    let video = (document.getElementById('video') as HTMLVideoElement);
    if(HLS.isSupported()) {
      let hls = new HLS();
      hls.loadSource('https://cdn-broadcast001-iad.tokbox.com/19170/19170_a6ce9c8b-5ef1-4cbc-8baa-608b43664bce.smil/playlist.m3u8');
      hls.attachMedia(video);
      hls.on(HLS.Events.MANIFEST_PARSED,function() {
        video.play();
      });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://cdn-broadcast001-iad.tokbox.com/19170/19170_a6ce9c8b-5ef1-4cbc-8baa-608b43664bce.smil/playlist.m3u8';
      video.addEventListener('loadedmetadata',function() {
        video.play();
      });
    } else {
      alert('Ошибка при запуске hls')
    }
    this.isOffline = false;
    // this.stream = stream;
    // this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {
    //   insertMode: 'append',
    //   width: '100%',
    //   height: '100%'
    // }, err => {
    //   if (err) {
    //     alert(err.message);
    //   } else {
    //     this.isOffline = false;
    //     this.changeDetector.detectChanges();
    //   }
    // });
  }
}
