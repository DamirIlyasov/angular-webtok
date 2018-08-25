import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46099812',
  sessionId: '2_MX40NjA5OTgxMn5udWxsfjE1MzUyMDAyNDc0NDV-SHJFaFF0V3VRYk94eHRPY0k3L0dJQTZ0fn4',
  token: 'T1==cGFydG5lcl9pZD00NjA5OTgxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9ZWJmODBjYzMwMTM1ZTc0MjMwZGM2M2ZmZTNiOTg3MjNkYjBhNzYxNjpzZXNzaW9uX2lkPTJfTVg0ME5qQTVPVGd4TW41dWRXeHNmakUxTXpVeU1EQXlORGMwTkRWLVNISkZhRkYwVjNWUllrOTRlSFJQWTBrM0wwZEpRVFowZm40JmNyZWF0ZV90aW1lPTE1MzUyMDAyNDcmcm9sZT1tb2RlcmF0b3Imbm9uY2U9MTUzNTIwMDI0Ny40NjI3MTkxOTYyMzg4OCZleHBpcmVfdGltZT0xNTM3NzkyMjQ3'
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
