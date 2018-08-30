import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: Storage;

  constructor() {
    this.storage = sessionStorage;
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getUserId() {
    return this.storage.getItem('userId');
  }

  getToken() {
    return this.storage.getItem('token');
  }

  setAuth(auth: AuthResponse) {
    this.storage.setItem('token', auth.token);
    this.storage.setItem('userId', auth.user.id);
  }
}
