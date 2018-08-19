import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../core/service/opentok.service';

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

  constructor(private opentokService: OpentokService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
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
      // const subscriber =
    })
      .then(() => this.opentokService.connect()
        .then(() => {
          this.session.on('streamCreated', event => {
            this.subscribe(event.stream);
          });
          this.session.on('streamDestroyed', event => {
            this.isOffline = true;
            this.changeDetector.detectChanges();
          });
          this.changeDetector.detectChanges();
        }))
      .catch(err => {
        console.error(err);
        alert('Unable to connect.');
      });
  }

  private subscribe(stream: OT.Stream) {
    this.stream = stream;
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, err => {
      if (err) {
        alert(err.message);
      } else {
        this.isOffline = false;
        this.changeDetector.detectChanges();
      }
    });
  }
}
