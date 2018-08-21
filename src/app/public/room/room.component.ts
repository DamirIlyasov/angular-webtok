import { Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { UserState } from '../../core/state/user.state';
import { distinctUntilChanged } from 'rxjs/operators';
import { Role } from '../../core/model/role';
import { User } from '../../core/model/user';
import { GetRoomInfoAction } from './room.actions';
import { RoomState } from './room.state';

const getUser = createSelector(
  (state: State) => state.user,
  (state: UserState) => state.user
);

const getRoom = createSelector(
  (state: State) => state.room,
  (state: RoomState) => state.room
);

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  ROLE = Role;
  inviteLink: string;
  user: User;
  showInputName = true;
  room = this.store.pipe(select(getRoom), distinctUntilChanged());

  constructor(private store: Store<State>) {

  }

  ngOnInit() {
    this.store.pipe(select(getUser), distinctUntilChanged()).subscribe(user => {
      this.user = user;
      if (user.login) {
        this.showInputName = false;
      }
    });
  }

  submitName() {
    if (this.user.login) {
      const roomKey = window.location.pathname.replace('/room/', '');
      this.store.dispatch(new GetRoomInfoAction({roomKey}));
      this.showInputName = false;
    }
  }
}
