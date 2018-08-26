import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46099812',
  sessionId: '1_MX40NjA5OTgxMn5udWxsfjE1MzUyNjk2NTcyNjR-RTNpM2FoRzk1aG1ILzNidjgrcEM0U1hvfn4',
  token: 'T1==cGFydG5lcl9pZD00NjA5OTgxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9MWZkNWYwMTZjYmM0MWIxNzk5M2MxN2FkZWY3MThkNjQ5ZWE2MjkxMDpzZXNzaW9uX2lkPTFfTVg0ME5qQTVPVGd4TW41dWRXeHNmakUxTXpVeU5qazJOVGN5TmpSLVJUTnBNMkZvUnprMWFHMUlMek5pZGpncmNFTTBVMWh2Zm40JmNyZWF0ZV90aW1lPTE1MzUyNjk2NTcmcm9sZT1tb2RlcmF0b3Imbm9uY2U9MTUzNTI2OTY1Ny4yNzY5MTMyNTE3NDQ3NSZleHBpcmVfdGltZT0xNTM3ODYxNjU3'
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  createRoom(roomName: string) {
    return of(MOCK_ROOM_1);
  }

  getRoomInfo(roomKey: string) {
    return of(MOCK_ROOM_1);
  }
}
