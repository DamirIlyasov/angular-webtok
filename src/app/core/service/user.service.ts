import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LogInRequest } from '../model/log-in-request';
import { of } from 'rxjs/internal/observable/of';

const MOCK_USER: User = {
  firstName: 'Damir',
  lastName: 'Ilyasov'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(request: LogInRequest) {
    return of(MOCK_USER);
  }

}
