import { Action } from '@ngrx/store';

export const ActionTypes = {
  AUTHENTICATE: '[user] Authenticate',
  AUTHENTICATE_SUCCESS: '[user] Authenticate success',
  AUTHENTICATE_ERROR: '[user] Authenticate error'
};

export class AuthenticateAction implements Action {
  type = ActionTypes.AUTHENTICATE;
}

export type Actions = AuthenticateAction;
