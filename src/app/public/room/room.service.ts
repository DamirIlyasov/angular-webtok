import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  roomKey: 'mockedRoomKey1',
  apiKey: '46173252',
  sessionId: '2_MX40NjE3MzI1Mn5-MTUzNDcwNjE3NTAyM35vYm1TbVRsbE5XNG5KNlpCdWhodWRxbDR-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3MzI1MiZzaWc9NTQzZjJkMGRkMzIxZDNlY2QwMjYxZTI2ZDZhNzNlZmY0MzI5ZGJiMzpzZXNzaW9uX2lkPTJfTVg0ME5qRTNNekkxTW41LU1UVXpORGN3TmpFM05UQXlNMzV2WW0xVGJWUnNiRTVYTkc1S05scENkV2hvZFdSeGJEUi1mZyZjcmVhdGVfdGltZT0xNTM0NzA2MTc1JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ3MDYxNzUuMDczOTIwMDI4OTAyOTk='
};

const MOCK_ROOM_2: Room = {
  roomKey: 'mockedRoomKey2',
  apiKey: '46173252',
  sessionId: '2_MX40NjE3MzI1Mn5-MTUzNDcwNjIyOTQ0Mn51TEdsbm5UczhidEcydWVxam9vTmR3WmZ-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3MzI1MiZzaWc9MmZkNzQ0YjNkOTMwNTkzNjU1NWUzZjhmNWY3YTZmYzQyMWJhMmZjMzpzZXNzaW9uX2lkPTJfTVg0ME5qRTNNekkxTW41LU1UVXpORGN3TmpJeU9UUTBNbjUxVEVkc2JtNVVjemhpZEVjeWRXVnhhbTl2VG1SM1dtWi1mZyZjcmVhdGVfdGltZT0xNTM0NzA2MjI5JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ3MDYyMjkuNDkwMzE0NDI5MjY5NTA='
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
