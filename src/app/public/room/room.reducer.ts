import { RoomState } from './room.state';
import { Actions, ActionTypes, RoomCreatedAction } from './room.actions';

export function reducer(state: RoomState = RoomState.defaul, action: Actions) {
  switch (action.type) {
    case ActionTypes.ROOM_CREATE:
      return Object.assign({}, state, {
        loading: true
      });
    case ActionTypes.ROOM_CREATED:
      return Object.assign({}, state, {
        loading: false,
        room: (action as RoomCreatedAction).payload
      });
    case ActionTypes.ROOM_CREATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: 'Error during room creation',
        errorUpdated: Date.now()
      });
    case ActionTypes.ROOM_GET_INFO:
      return Object.assign({}, state, {
        loading: true
      });
    case ActionTypes.ROOM_GET_INFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        room: (action as RoomCreatedAction).payload
      });
    case ActionTypes.ROOM_GET_INFO_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: 'Error during getting room info',
        errorUpdated: Date.now()
      });
    default:
      return state;
  }
}
