import { Action } from '@ngrx/store';
import { Room } from '../../core/model/room';

export const ActionTypes = {
  ROOM_CREATE: '[room] Create room',
  ROOM_CREATED: '[room] Room created successfully',
  ROOM_CREATE_ERROR: '[room] Error during creating room',
  ROOM_GET_INFO: '[room] Get room info',
  ROOM_GET_INFO_SUCCESS: '[room] Successfully got room info',
  ROOM_GET_INFO_ERROR: '[room] Error during getting room info'
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

export class RoomCreateErrorAction implements Action {
  type = ActionTypes.ROOM_CREATE_ERROR;
}

export class GetRoomInfoAction implements Action {
  type = ActionTypes.ROOM_GET_INFO;

  constructor(public payload: { roomKey: string }) {
  }
}

export class GetRoomInfoSuccessAction implements Action {
  type = ActionTypes.ROOM_GET_INFO_SUCCESS;

  constructor(public payload: Room) {
  }
}

export class GetRoomInfoErrorAction implements Action {
  type = ActionTypes.ROOM_GET_INFO_ERROR;
}

export type Actions = RoomCreateAction
  | RoomCreateErrorAction
  | RoomCreatedAction
  | GetRoomInfoAction
  | GetRoomInfoSuccessAction;
