import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  roomKey: 'mockedRoomKey1',
  apiKey: '46153682',
  sessionId: '2_MX40NjE1MzY4Mn5-MTUzNDYyOTQ3MTQ4MH5MZnR0am5MMHZralFNY2IwY280UmVSWFd-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE1MzY4MiZzaWc9OWMxOTMyZWJmODNlYjMyZmJlNTJjMWZiNGU3MDk0OTE1NGI1ZjU1MjpzZXNzaW9uX2lkPTJfTVg0ME5qRTFNelk0TW41LU1UVXpORFl5T1RRM01UUTRNSDVNWm5SMGFtNU1NSFpyYWxGTlkySXdZMjgwVW1WU1dGZC1mZyZjcmVhdGVfdGltZT0xNTM0NjI5NDcxJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ2Mjk0NzEuNTI4NjgwMDUxOTYyMQ=='
};

const MOCK_ROOM_2: Room = {
  roomKey: 'mockedRoomKey2',
  apiKey: '46153682',
  sessionId: '1_MX40NjE1MzY4Mn5-MTUzNDYyOTUxOTY5NH5ZSXNQcUgva2N5U21NWHVCM1U2WEx2ZlJ-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE1MzY4MiZzaWc9MTgwZTYxYjk0ODU5OTExODgzYjkyYzc4MTU5MjBiYjQyZDFhZGUxNTpzZXNzaW9uX2lkPTFfTVg0ME5qRTFNelk0TW41LU1UVXpORFl5T1RVeE9UWTVOSDVaU1hOUWNVZ3ZhMk41VTIxTldIVkNNMVUyV0V4MlpsSi1mZyZjcmVhdGVfdGltZT0xNTM0NjI5NTIzJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ2Mjk1MjMuOTA5MTE3MzMyMjM4NTY='
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  createRoom(roomName: string) {
    if (roomName === 'Test 1') {
      return of(MOCK_ROOM_1);
    } else {
      return of(MOCK_ROOM_2);
    }
  }
}
