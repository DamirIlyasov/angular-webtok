import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AuthRequest } from '../model/auth-request';
import { of } from 'rxjs/internal/observable/of';
import { RegistrateRequest } from '../model/registrate-request';
import { Role } from '../model/role';

const MOCK_USER: User = {
  firstName: 'Damir',
  lastName: 'Ilyasov',
  role: Role.PUBLISHER
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
