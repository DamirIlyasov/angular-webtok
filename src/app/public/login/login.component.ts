import { Component } from '@angular/core';
import { AuthRequest } from '../../core/model/auth';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { AuthenticateAction } from '../../core/state/user.actions';
import { UserState } from '../../core/state/user.state';
import { distinctUntilChanged } from 'rxjs/operators';

const getAuthError = createSelector(
  (state: State) => state.user,
  (state: UserState) => state.error
);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  request = new AuthRequest();
  authError = this.store.pipe(select(getAuthError), distinctUntilChanged());

  constructor(private store: Store<State>) {
  }

  submit() {
    if (this.request.validate()) {
      this.store.dispatch(new AuthenticateAction(this.request));
    }
  }
}
