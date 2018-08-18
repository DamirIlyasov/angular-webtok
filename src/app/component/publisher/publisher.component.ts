import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OpentokService } from '../../opentok.service';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})

export class PublisherComponent implements AfterViewInit, OnInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing = false;
  viewersCount = 0;

  constructor(private opentokService: OpentokService) {
  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {insertMode: 'append', resolution: '1280x960'});
  }

  publish() {
    this.session.publish(this.publisher, err => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

  unpublish() {
    this.session.unpublish(this.publisher);
    this.publishing = false;
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {insertMode: 'append'});
  }

  isAvailableToPublish() {
    return !!(this.session && this.session['isConnected']()) && !this.publishing;
  }

  isAvailableToUnpublish() {
    return this.publishing;
  }

  ngOnInit(): void {
    this.session.on('connectionCreated', () => {
      this.viewersCount++;
    });

    this.session.on('connectionDestroyed', () => {
      if (this.viewersCount > 0) {
        this.viewersCount--;
      }
    });
  }
}
