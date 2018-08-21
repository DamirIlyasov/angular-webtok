import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Mocked room name 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46173252',
  sessionId: '2_MX40NjE3MzI1Mn5-MTUzNDg1NzAyNDEyM34yd2RYWGJUaXJoZUtUQU5keGdSMEVRM3p-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3MzI1MiZzaWc9N2E3MjIxMzBmYWQ2NDNlMzY1OTQ1YzM0YjQ1OWI2MDg0MmFjMDQ0NzpzZXNzaW9uX2lkPTJfTVg0ME5qRTNNekkxTW41LU1UVXpORGcxTnpBeU5ERXlNMzR5ZDJSWVdHSlVhWEpvWlV0VVFVNWtlR2RTTUVWUk0zcC1mZyZjcmVhdGVfdGltZT0xNTM0ODU3MDI0JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ4NTcwMjQuMTcxOTEyNzQxNjk2NzU='
};

const MOCK_ROOM_2: Room = {
  name: 'Mocked room name 2',
  roomKey: 'mockedRoomKey2',
  apiKey: '46173252',
  sessionId: '1_MX40NjE3MzI1Mn5-MTUzNDg1NzA2NTY5NH5WckNXeHpZQzl5T2x5NXluODhNdWtkUVN-fg',
  token: 'T1==cGFydG5lcl9pZD00NjE3MzI1MiZzaWc9YzA4NzM5NmQ3N2FkNDllOTJlNDMzYzcxNjRlMmVhYzkwMjI1YWQ1YTpzZXNzaW9uX2lkPTFfTVg0ME5qRTNNekkxTW41LU1UVXpORGcxTnpBMk5UWTVOSDVXY2tOWGVIcFpRemw1VDJ4NU5YbHVPRGhOZFd0a1VWTi1mZyZjcmVhdGVfdGltZT0xNTM0ODU3MDY1JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MzQ4NTcwNjUuNzQwODEzNTMyMTEyOTE='
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
