import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46099812',
  sessionId: '1_MX40NjA5OTgxMn5-MTUzNTEzMjc3MDA0Mn4yY2hieUlROFdpTkkxQWNucjdCamwrTFp-fg',
  token: 'T1==cGFydG5lcl9pZD00NjA5OTgxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9ZTUwY2FmZWU0MGUxY2U2Zjg5OTIyMjQ3MDNhMDgyZGRjYWRiZDhlYzpzZXNzaW9uX2lkPTFfTVg0ME5qQTVPVGd4TW41LU1UVXpOVEV6TWpjM01EQTBNbjR5WTJoaWVVbFJPRmRwVGtreFFXTnVjamRDYW13clRGcC1mZyZjcmVhdGVfdGltZT0xNTM1MTMyNzcwJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MzUxMzI3NzAuMDY1OTIzODEzNDM3NiZleHBpcmVfdGltZT0xNTM3NzI0Nzcw'
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
