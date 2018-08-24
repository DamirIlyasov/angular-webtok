import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../core/service/opentok.service';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { RoomState } from '../../public/room/room.state';
import { Room } from '../../core/model/room';
import { distinctUntilChanged } from 'rxjs/operators';

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
    const hlsUrl = 'https://cdn-broadcast001-dub.tokbox.com/29440/29440_afb2f83a-7bd9-4072-ad13-2d9b95891bec.smil/playlist.m3u8';
    let video = (document.getElementById('video') as HTMLVideoElement);
    console.log(video);

    if (video.canPlayType('application/vnd.apple.mpegURL')) {
      this.isOffline = false;
      video.src = hlsUrl;
      video.onloadedmetadata = () => video.play();

      // video.addEventListener('loadedmetadata', function() {
      //   video.play();
      // });
    }
    // if (HLS.isSupported()) {
    //   let hls = new HLS();
    //   hls.loadSource(hlsUrl);
    //   hls.attachMedia(video);
    //   hls.on(HLS.Events.MANIFEST_PARSED, function() {
    //     video.play();
    //   });
    // }
    // else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //   video.src = hlsUrl;
    //   video.addEventListener('loadedmetadata', function() {
    //     video.play();
    //   });
    // } else {
    //   alert('Ошибка при запуске hls');
    // }
  }
}
