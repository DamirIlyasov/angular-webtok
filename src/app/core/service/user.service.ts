import { Injectable } from '@angular/core';
import { AuthRequest, AuthResponse } from '../model/auth';
import { API_URL } from '../../../environments/app.env';
import { AUTH_PATH, USER_INFO_PATH } from '../../../environments/api-path-env';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { User } from '../model/user';

const AUTH_URL = API_URL + AUTH_PATH;
const USER_INFO_URL = API_URL + USER_INFO_PATH;

// const MOCK_USER: User = {
//   login: 'Damir',
//   email: 'test@gmail.com',
//   role: Role.PUBLISHER
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  login(request: AuthRequest) {
    return this.http.post<AuthResponse>(AUTH_URL, request);
  }

  getUserInfo() {
    return this.http.get<User>(USER_INFO_URL);
  }
}
