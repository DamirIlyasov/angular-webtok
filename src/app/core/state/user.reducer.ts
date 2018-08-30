import { UserState } from './user.state';
import { Actions, ActionTypes, GetUserInfoSuccessAction } from './user.actions';

export function reducer(state: UserState = UserState.default, action: Actions) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
      return Object.assign({}, state, {
        loading: true
      });
    case ActionTypes.AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        errorUpdated: Date.now()
      });
    case ActionTypes.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: 'Неверный логин или пароль',
        errorUpdated: Date.now()
      });
    case ActionTypes.GET_USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        user: (action as GetUserInfoSuccessAction).payload
      });
    default:
      return state;
  }
}
