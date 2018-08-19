import { Action } from '@ngrx/store';
import { Room } from '../../core/model/room';

export const ActionTypes = {
  ROOM_CREATE: '[room] Create room',
  ROOM_CREATED: '[room] Room created successfully',
  ROOM_CREATE_ERROR: '[room] Error during creating room'
};


export class RoomCreateAction implements Action {
  type = ActionTypes.ROOM_CREATE;

  constructor(public payload: string) {
  }
}

export class RoomCreatedAction implements Action {
  type = ActionTypes.ROOM_CREATED;

  constructor(public payload: Room) {
  }
}

export class RoomCreationError implements Action {
  type = ActionTypes.ROOM_CREATE_ERROR;
}

export type Actions = RoomCreateAction
  | RoomCreationError
  | RoomCreatedAction;
