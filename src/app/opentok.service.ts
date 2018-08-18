import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import { API_KEY, SAMPLE_SERVER_BASE_URL, SESSION_ID, TOKEN } from '../config';

@Injectable({
  providedIn: 'root'
})
export class OpentokService {

  session: OT.Session;
  token: string;

  getOT() {
    return OT;
  }

  initSession() {
    if (API_KEY && TOKEN && SESSION_ID) {
      this.session = this.getOT().initSession(API_KEY, SESSION_ID);
      this.token = TOKEN;
      return Promise.resolve(this.session);
    } else {
      return fetch(SAMPLE_SERVER_BASE_URL + '/session')
        .then(data => data.json())
        .then(json => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, err => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}
