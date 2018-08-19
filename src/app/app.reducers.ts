import { UserState } from './core/state/user.state';
import { RoomState } from './public/room/room.state';

export interface State {
  user: UserState;
  room: RoomState;
}
