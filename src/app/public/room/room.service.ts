import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Room } from '../../core/model/room';

const MOCK_ROOM_1: Room = {
  name: 'Захардкоженое имя комнаты 1',
  roomKey: 'mockedRoomKey1',
  apiKey: '46099812',
  sessionId: '1_MX40NjA5OTgxMn5udWxsfjE1MzUzMTUzNTQ0MTJ-UHVMakdFVndNSE5WamdLSyt3RnZCV1o1fn4',
  token: 'T1==cGFydG5lcl9pZD00NjA5OTgxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9ZjM5Y2ZkZTk5Mzg0NzAyNDY3Mjk0YmZjYzI0YTBhYmVmZmM2YTIwMDpzZXNzaW9uX2lkPTFfTVg0ME5qQTVPVGd4TW41dWRXeHNmakUxTXpVek1UVXpOVFEwTVRKLVVIVk1ha2RGVm5kTlNFNVdhbWRMU3l0M1JuWkNWMW8xZm40JmNyZWF0ZV90aW1lPTE1MzUzMTUzNTQmcm9sZT1tb2RlcmF0b3Imbm9uY2U9MTUzNTMxNTM1NC40MzQxMzUyMTA4ODg1JmV4cGlyZV90aW1lPTE1Mzc5MDczNTQ='
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
