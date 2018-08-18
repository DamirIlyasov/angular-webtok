import { Action } from '@ngrx/store';
import { User } from '../model/user';
import { AuthRequest } from '../model/auth-request';
import { RegistrateRequest } from '../model/registrate-request';

export const ActionTypes = {
  AUTHENTICATE: '[user] Authenticate',
  AUTHENTICATE_SUCCESS: '[user] Authenticate success',
  AUTHENTICATE_ERROR: '[user] Authenticate error',
  REGISTRATE: '[user] Registration',
  REGISTRATE_SUCCESS: '[user] Registrate success',
  REGISTRATE_ERROR: '[user] Registrate error'
};

export class AuthenticateAction implements Action {
  type = ActionTypes.AUTHENTICATE;

  constructor(public payload: AuthRequest) {
  }
}

export class AuthenticateSuccessAction implements Action {
  type = ActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: User) {
  }
}

export class AuthenticateErrorAction implements Action {
  type = ActionTypes.AUTHENTICATE_ERROR;
}

export class RegistrateAction implements Action {
  type = ActionTypes.REGISTRATE;

  constructor(public payload: RegistrateRequest) {
  }
}

export class RegistrateSuccessAction implements Action {
  type = ActionTypes.REGISTRATE_SUCCESS;

  constructor(public payload: User) {
  }
}

export class RegistrateErrorAction implements Action {
  type = ActionTypes.REGISTRATE_ERROR;
}

export type Actions = AuthenticateAction
  | AuthenticateSuccessAction
  | AuthenticateErrorAction
  | RegistrateAction
  | RegistrateErrorAction
  | RegistrateSuccessAction;
