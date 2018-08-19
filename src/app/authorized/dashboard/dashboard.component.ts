import { Component } from '@angular/core';
import { State } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { RoomCreateAction } from '../../public/room/room.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  roomName: string;

  constructor(private store: Store<State>) {
  }

  createRoom() {
    if (this.roomName) {
      this.store.dispatch(new RoomCreateAction(this.roomName));
    }
  }
}
