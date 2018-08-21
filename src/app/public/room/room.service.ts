import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46173252',
  sessionId: '2_MX40NjE3MzI1Mn5-MTUzNDg4OTM0MDkyNX4rOTVxNzdHQ3hFa3dvdEpOR2RoSjN3dGN-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3MzI1MiZzaWc9YzdmZmM0NDAyZjE4NDk3MzE5Y2EzYWQzMDIzMjFlYWRiOTZlODMxNjpzZXNzaW9uX2lkPTJfTVg0ME5qRTNNekkxTW41LU1UVXpORGc0T1RNME1Ea3lOWDRyT1RWeE56ZEhRM2hGYTNkdmRFcE9SMlJvU2pOM2RHTi1mZyZjcmVhdGVfdGltZT0xNTM0ODg5MzQwJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ4ODkzNDAuOTc5OTEwNDAzNjkyNTU='
};

const MOCK_ROOM_2: Room = {
  name: 'Захардкоженое имя комнаты 2',
  roomKey: 'mockedRoomKey2',
  apiKey: '46173252',
  sessionId: '1_MX40NjE3MzI1Mn5-MTUzNDg4OTM5NzgyNH5vTkVsWlJLc3BDaTUwdzNOUnl1QXltK05-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3MzI1MiZzaWc9YWMwMjg1NzJjZWUxMGRlZWU5ZDNlY2M5ZWYyZWI2ZjM4OTQ2MWQ1NTpzZXNzaW9uX2lkPTFfTVg0ME5qRTNNekkxTW41LU1UVXpORGc0T1RNNU56Z3lOSDV2VGtWc1dsSkxjM0JEYVRVd2R6Tk9VbmwxUVhsdEswNS1mZyZjcmVhdGVfdGltZT0xNTM0ODg5Mzk3JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ4ODkzOTcuODY5NTIwNzkwMjE4NzQ='
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  createRoom(roomName: string) {
    return of(MOCK_ROOM_1)
  }

  getRoomInfo(roomKey: string) {
    return of(MOCK_ROOM_1);
  }
}
