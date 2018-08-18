import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AuthRequest } from '../model/auth-request';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { RegistrateRequest } from '../model/registrate-request';

const MOCK_USER: User = {
  firstName: 'Damir',
  lastName: 'Ilyasov'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(request: AuthRequest) {
    return of(MOCK_USER);
  }

  registrate(request: RegistrateRequest) {
    return of(MOCK_USER);
  }
}
