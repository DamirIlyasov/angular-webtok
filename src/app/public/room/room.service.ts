import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46099812',
  sessionId: '2_MX40NjA5OTgxMn5udWxsfjE1MzUxOTQ4NDc1MjN-TGUxT2NVelFzcGw1b0RyY21nOEgvdTY4fn4',
  token: 'T1==cGFydG5lcl9pZD00NjA5OTgxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9YWRmMjlhMzNlMTRlZDA3ODQ4MDBiOTQ1ZGI1M2YxMzg1NTIxYWVjNDpzZXNzaW9uX2lkPTJfTVg0ME5qQTVPVGd4TW41dWRXeHNmakUxTXpVeE9UUTRORGMxTWpOLVRHVXhUMk5WZWxGemNHdzFiMFJ5WTIxbk9FZ3ZkVFk0Zm40JmNyZWF0ZV90aW1lPTE1MzUxOTQ4NDcmcm9sZT1tb2RlcmF0b3Imbm9uY2U9MTUzNTE5NDg0Ny41MzYyMTIwODQ5OTE0MCZleHBpcmVfdGltZT0xNTM3Nzg2ODQ3'
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
