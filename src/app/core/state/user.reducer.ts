import { UserState } from './user.state';
import { Actions, ActionTypes, AuthenticateSuccessAction, RegistrateSuccessAction } from './user.actions';

export function reducer(state: UserState = UserState.default, action: Actions) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
    case ActionTypes.REGISTRATE:
      return Object.assign({}, state, {
        loading: true
      });
    case ActionTypes.AUTHENTICATE_SUCCESS:
    case ActionTypes.REGISTRATE_SUCCESS:
      return Object.assign({}, state, {
        user: (action as AuthenticateSuccessAction | RegistrateSuccessAction).payload,
        loading: false
      });
    case ActionTypes.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: 'Error during logging in',
        errorUpdated: Date.now()
      });
    case ActionTypes.REGISTRATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: 'Error during registration',
        errorUpdated: Date.now()
      });
    default:
      return state;
  }
}
