import { Room } from '../../core/model/room';

export class RoomState {
  static readonly defaul: RoomState = Object.seal({
    room: {
      roomKey: null,
      apiKey: null,
      token: null,
      sessionId: null
    },
    loading: false,
    error: null,
    errorUpdated: null
  });
  room: Room;
  loading: boolean;
  error: string;
  errorUpdated: number;
}
