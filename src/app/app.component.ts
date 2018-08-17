import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {OpentokService} from './opentok.service';
import * as OT from '@opentok/client';

@ Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  header = 'Welcome';
}
