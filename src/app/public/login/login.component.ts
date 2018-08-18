import { Component } from '@angular/core';
import { LogInRequest } from '../../core/model/log-in-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  request = new LogInRequest();

  logIn() {
    if (this.request.validate()) {

    }
  }
}
