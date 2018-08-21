import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';

@Injectable({
  providedIn: 'root'
})
export class OpentokService {

  initSession(apiKey: string, sessionId: string): OT.Session {
    return OT.initSession(apiKey, sessionId);
  }

  connect(session: OT.Session, token: string) {
    return new Promise((resolve, reject) => {
      session.connect(token, err => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    });
  }
}
