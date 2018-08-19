import { Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { UserState } from '../../core/state/user.state';
import { distinctUntilChanged } from 'rxjs/operators';
import { Role } from '../../core/model/role';
import { User } from '../../core/model/user';

const getUser = createSelector(
  (state: State) => state.user,
  (state: UserState) => state.user
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

  constructor(private store: Store<State>) {

  }

  ngOnInit() {
    this.store.pipe(select(getUser), distinctUntilChanged()).subscribe(user => {
      this.user = user;
      if (user.firstName) {
        this.showInputName = false;
      }
    });
  }

  submitName() {
    if (this.user.firstName) {
      this.showInputName = false;
    }
  }
}
