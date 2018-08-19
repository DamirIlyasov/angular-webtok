import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OpentokService } from '../../core/service/opentok.service';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})

export class PublisherComponent implements AfterViewInit, OnInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  session: OT.Session;
  publisher: OT.Publisher;
  publishing = false;
  viewersCount = -1;
  stream: OT.Stream;
  inviteLink: string;

  constructor(private opentokService: OpentokService) {
  }

  ngAfterViewInit() {
    const ot = this.opentokService.getOT();
    this.publisher = ot.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: 'append',
      resolution: '640x480', width: '100%',
      height: '100%'
    });
    this.publisher.on('streamDestroyed', event => {
      event.preventDefault();
    });
    this.publisher.on('streamCreated', event => {
      this.stream = event.stream;
    });
  }

  publish() {
    if (this.isAvailableToPublish()) {
      this.session.publish(this.publisher, err => {
        if (err) {
          alert(err.message);
        } else {
          this.publishing = true;
        }
      });
    }
  }

  unpublish() {
    if (this.isAvailableToUnpublish()) {
      this.session.unpublish(this.publisher);
      this.publishing = false;
    }
  }

  isAvailableToPublish() {
    return !!(this.session && this.session['isConnected']()) && !this.publishing;
  }

  isAvailableToUnpublish() {
    return this.publishing;
  }

  ngOnInit() {
    this.inviteLink = window.location.href;
    this.opentokService.initSession()
      .then((session: OT.Session) => {
        this.session = session;
        this.session.on('connectionCreated', event => {
          this.viewersCount++;
        });
        this.session.on('connectionDestroyed', event => {
          this.viewersCount--;
        });
        this.opentokService.connect();
      })
      .catch(err => {
        console.log(err);
        alert('Unable to connect.');
      });
  }
}
