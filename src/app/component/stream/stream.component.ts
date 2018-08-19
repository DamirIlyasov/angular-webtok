import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../core/service/opentok.service';
import { Role } from '../../core/model/role';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  providers: [OpentokService]
})
export class StreamComponent implements OnInit {

  ROLE = Role;
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  role = Role.NOT_SELECTED;

  constructor(private changeDetector: ChangeDetectorRef, private opentokService: OpentokService) {
  }

  ngOnInit() {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', event => {
        this.streams.push(event.stream);
        this.changeDetector.detectChanges();
      });
      this.session.on('streamDestroyed', event => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetector.detectChanges();
        }
      });
    })
      .then(() => this.opentokService.connect())
      .catch(err => {
        console.error(err);
        alert('Unable to connect.');
      });
  }
}
