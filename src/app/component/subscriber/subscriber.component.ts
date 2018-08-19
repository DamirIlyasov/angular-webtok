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

  constructor(private opentokService: OpentokService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // from(this.opentokService.initSession()).pipe(
    //   map((session: OT.Session) => {
    //     this.session = session;
    //     this.session.on('streamCreated', event => {
    //       this.stream = event.stream;
    //       this.changeDetector.detectChanges();
    //     });
    //   }),
    //   map(() => from(this.opentokService.connect()).pipe(
    //     map(() => this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {}, err => {
    //       if (err) {
    //         throwError(err.message);
    //       }
    //     }))
    //   )),
    //   catchError((err1, err2) =>
    //     of(console.log(err1, err2))
    //   )
    // )
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('sessionConnected', event => {
        if (event.target['streams'].length() !== 0) {
          this.subscribe(event.target['streams'].find());
        }
      });
      // const subscriber =
    })
      .then(() => this.opentokService.connect()
        .then(() => {
          this.session.on('streamCreated', event => {
            this.subscribe(event.stream);
          });
          this.session.on('streamDestroyed', event => {
            event.preventDefault();
            // this.session.unsubscribe(this.subscriber);
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
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {}, err => {
      if (err) {
        alert(err.message);
      }
    });
    this.changeDetector.detectChanges();
  }
}
