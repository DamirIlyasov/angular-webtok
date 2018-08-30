import { Room, Subscriber } from '../../core/model/room';

export class RoomState {
  static readonly defaul: RoomState = Object.seal({
    room: null,
    loading: false,
    error: null,
    errorUpdated: null,
    streamUrl: '',
    broadcastOnline: false,
    subscribers: []
  });
  room: Room;
  streamUrl: string;
  loading: boolean;
  error: string;
  errorUpdated: number;
  broadcastOnline: boolean;
  subscribers: Subscriber[];
}
