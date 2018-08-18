import { inject, TestBed } from '@angular/core/testing';
import * as OT from '@opentok/client';
import { OpentokService } from './opentok.service';
import { API_KEY, SESSION_ID, TOKEN } from '../config';


describe('OpentokService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpentokService]
    });
  });

  describe('service', () => {
    API_KEY = 'apiKey';
    SESSION_ID = 'sessionId';
    TOKEN = 'token';
    let service;
    beforeEach(inject([OpentokService], (s: OpentokService) => {
      service = s;
    }));

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('getOT() should return OT', () => {
      expect(service.getOT()).toEqual(OT);
    });

    describe('initSession()', () => {
      const mockOT = {
        initSession() {
          //
        }
      };
      let session;

      beforeEach(() => {
        spyOn(service, 'getOT').and.returnValue(mockOT);
        session = jasmine.createSpyObj('session', ['connect', 'on']);
        spyOn(mockOT, 'initSession').and.returnValue(session);
      });

      it('should call OT.initSession', () => {
        service.initSession();
        expect(mockOT.initSession).toHaveBeenCalledWith(API_KEY, SESSION_ID);
        expect(service.session).toEqual(session);
      });

      it('connect should call connect', () => {
        service.initSession();
        service.connect();
        expect(service.session.connect).toHaveBeenCalledWith(TOKEN, jasmine.any(Function));
      });
    });
  });
});
