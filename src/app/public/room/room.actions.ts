import { Action } from '@ngrx/store';
import { Room, Subscriber } from '../../core/model/room';

export const ActionTypes = {
  ROOM_CREATE: '[room] Create room',
  ROOM_CREATED: '[room] Room created successfully',
  ROOM_CREATE_ERROR: '[room] Error during creating room',
  ROOM_GET_INFO: '[room] Get room info',
  ROOM_GET_INFO_SUCCESS: '[room] Successfully got room info',
  ROOM_GET_INFO_ERROR: '[room] Error during getting room info',
  ROOM_GET_STREAM_URL: '[room] Get stream url',
  ROOM_GET_STREAM_URL_SUCCESS: '[room] Get stream url success',
  ROOM_GET_STREAM_URL_ERROR: '[room] Get stream url error',
  BROADCAST_START: '[room] Start broadcast',
  BROADCAST_START_ERROR: '[room] Start broadcast error',
  BROADCAST_START_SUCCESS: '[room] Start broadcast success',
  BROADCAST_STOP: '[room] Stop broadcast',
  BROADCAST_STOP_ERROR: '[room] Stop broadcast error',
  BROADCAST_STOP_SUCCESS: '[room] Stop broadcast success',
  GET_SUBSCRIBERS: '[room] Get subscribers',
  GET_SUBSCRIBERS_SUCCESS: '[room] Get subscribers success',
  GET_SUBSCRIBERS_ERROR: '[room] Get subscribers error',
  ADD_SUBSCRIBER: '[room] Add subscriber',
  ADD_SUBSCRIBER_SUCCESS: '[room] Add subscriber success',
  ADD_SUBSCRIBER_ERROR: '[room] Add subscriber error',
  DELETE_SUBSCRIBER: '[room] Delete subscriber',
  DELETE_SUBSCRIBER_SUCCESS: '[room] Delete subscriber success',
  DELETE_SUBSCRIBER_ERROR: '[room] Delete subscriber error'
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

  constructor(public payload: { roomId: string }) {
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

export class GetStreamUrlAction implements Action {
  type = ActionTypes.ROOM_GET_STREAM_URL;

  constructor(public payload: { roomId: string }) {

  }
}

export class GetStreamUrlSuccessAction implements Action {
  type = ActionTypes.ROOM_GET_STREAM_URL_SUCCESS;

  constructor(public payload: string) {

  }
}

export class GetStreamUrlErrorAction implements Action {
  type = ActionTypes.ROOM_GET_STREAM_URL_ERROR;
}

export class StartBroadcastAction implements Action {
  type = ActionTypes.BROADCAST_START;

  constructor(public payload: { roomId: string }) {

  }
}

export class StartBroadcastSuccessAction implements Action {
  type = ActionTypes.BROADCAST_START_SUCCESS;
}

export class StartBroadcastErrorAction implements Action {
  type = ActionTypes.BROADCAST_START_ERROR;
}

export class StopBroadcastAction implements Action {
  type = ActionTypes.BROADCAST_STOP;

  constructor(public payload: { roomId: string }) {

  }
}

export class StopBroadcastSuccessAction implements Action {
  type = ActionTypes.BROADCAST_STOP_SUCCESS;
}

export class StopBroadcastErrorAction implements Action {
  type = ActionTypes.BROADCAST_STOP_ERROR;
}

export class GetSubscribersAction implements Action {
  type = ActionTypes.GET_SUBSCRIBERS;

  constructor(public payload: { roomId: string }) {
  }
}

export class GetSubscribersSuccessAction implements Action {
  type = ActionTypes.GET_SUBSCRIBERS_SUCCESS;

  constructor(public payload: Subscriber[]) {

  }
}

export class GetSubscribersErrorAction implements Action {
  type = ActionTypes.GET_SUBSCRIBERS_ERROR;
}

export class SubscribeAction implements Action {
  type = ActionTypes.ADD_SUBSCRIBER;

  constructor(public payload: { roomId: string }) {

  }
}

export class SubscribeSuccessAction implements Action {
  type = ActionTypes.ADD_SUBSCRIBER_SUCCESS;
}

export class SubscribeErrorAction implements Action {
  type = ActionTypes.ADD_SUBSCRIBER_ERROR;
}

export class UnsubscribeAction implements Action {
  type = ActionTypes.DELETE_SUBSCRIBER;

  constructor(public payload: { roomId: string }) {

  }
}

export class UnsubscribeSuccessAction implements Action {
  type = ActionTypes.DELETE_SUBSCRIBER_SUCCESS;
}

export class UnsubscribeErrorAction implements Action {
  type = ActionTypes.DELETE_SUBSCRIBER_ERROR;
}

export type Actions = RoomCreateAction
  | RoomCreateErrorAction
  | RoomCreatedAction
  | GetRoomInfoAction
  | GetRoomInfoSuccessAction
  | GetStreamUrlAction
  | GetStreamUrlErrorAction
  | GetStreamUrlSuccessAction
  | StartBroadcastAction
  | StartBroadcastErrorAction
  | StartBroadcastSuccessAction
  | StopBroadcastAction
  | StopBroadcastErrorAction
  | StopBroadcastSuccessAction
  | SubscribeAction
  | UnsubscribeAction;
