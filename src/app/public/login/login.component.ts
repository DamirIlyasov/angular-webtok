import { Component } from '@angular/core';
import { AuthRequest } from '../../core/model/auth-request';
import { Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { AuthenticateAction } from '../../core/state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  request = new AuthRequest();

  constructor(private store: Store<State>) {
  }

  submit() {
    if (this.request.validate()) {
      this.store.dispatch(new AuthenticateAction(this.request));
    }
  }
}
