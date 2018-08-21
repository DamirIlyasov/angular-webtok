import { Component } from '@angular/core';
import { RegistrateRequest } from '../../core/model/registrate-request';
import { State } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { RegistrateAction } from '../../core/state/user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  request = new RegistrateRequest();
  repeatPassword: string;

  constructor(private store: Store<State>) {
  }

  submit() {
    if (this.request.validate()) {
      this.store.dispatch(new RegistrateAction(this.request));
    }
  }

  isPasswordSame() {
    if (this.request.password && this.repeatPassword) {
      return this.request.password === this.repeatPassword;
    }
    return true;
  }
}
