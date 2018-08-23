import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46176022',
  sessionId: '2_MX40NjE3NjAyMn5-MTUzNTA1NjY1OTA0OX5rV0JwSGMzT3JhYXBWMFFSa2QvaGI2R25-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3NjAyMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9MWNlZWJmNTM4Yjg2NDIwZWQ5NjBjZWIxOGNiZThhOTFjOTkxOGEyODpzZXNzaW9uX2lkPTJfTVg0ME5qRTNOakF5TW41LU1UVXpOVEExTmpZMU9UQTBPWDVyVjBKd1NHTXpUM0poWVhCV01GRlNhMlF2YUdJMlIyNS1mZyZjcmVhdGVfdGltZT0xNTM1MDU2NjU5JnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MzUwNTY2NTkuMDc2OTEyNjY5MzEyMjYmZXhwaXJlX3RpbWU9MTUzNzY0ODY1OQ=='
};

const MOCK_ROOM_2: Room = {
  name: 'Захардкоженое имя комнаты 2',
  roomKey: 'mockedRoomKey2',
  apiKey: '46176022',
  sessionId: '2_MX40NjE3NjAyMn5-MTUzNTA0NTY4ODYyOH50RWRiVk1za3RhUnZvRTVlejhxNUlFd3d-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3NjAyMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9Njc4NTM3ZDJkMDNlMDI3MWNlMGYzMWVjNzNkNDY1N2VmMTEwYWRjMzpzZXNzaW9uX2lkPTJfTVg0ME5qRTNOakF5TW41LU1UVXpOVEEwTlRZNE9EWXlPSDUwUldSaVZrMXphM1JoVW5adlJUVmxlamh4TlVsRmQzZC1mZyZjcmVhdGVfdGltZT0xNTM1MDQ1Njg4JnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MzUwNDU2ODguNjM4NzM5NjQyMTc4MyZleHBpcmVfdGltZT0xNTM3NjM3Njg4'
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
