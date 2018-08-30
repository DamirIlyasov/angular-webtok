import { Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { UserState } from '../../core/state/user.state';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../core/model/user';
import { GetRoomInfoAction } from './room.actions';
import { RoomState } from './room.state';
import { Router } from '@angular/router';

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
  user: User;
  room = this.store.pipe(select(getRoom), distinctUntilChanged());

  constructor(private store: Store<State>, private router: Router) {

  }

  ngOnInit() {
    this.store.pipe(select(getUser), distinctUntilChanged()).subscribe(user => {
      if (user) {
        this.user = user;
        const roomId = this.router.url.replace('/room/', '');
        this.store.dispatch(new GetRoomInfoAction({roomId}));
      }
    });
  }
}
