import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46099812',
  sessionId: '1_MX40NjA5OTgxMn5-MTUzNTYyMjQ0NTY0NX5GRWcraHhNVFoyYlFzd3ptd0dDQlhadXd-fg',
  token: 'T1==cGFydG5lcl9pZD00NjA5OTgxMiZzaWc9MjJlNzkyZWYxZGE5ZTRiNTQ4NWQyNTYyMTljOWRhNjg5MTA3MjY4NzpzZXNzaW9uX2lkPTFfTVg0ME5qQTVPVGd4TW41LU1UVXpOVFl5TWpRME5UWTBOWDVHUldjcmFIaE5WRm95WWxGemQzcHRkMGREUWxoYWRYZC1mZyZjcmVhdGVfdGltZT0xNTM1NjIyNDQ1JnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MzU2MjI0NDUuNjc2MjExMjU1Mjg5Mg=='
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
