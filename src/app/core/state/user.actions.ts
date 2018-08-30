import { Action } from '@ngrx/store';
import { User } from '../model/user';
import { AuthRequest } from '../model/auth';

export const ActionTypes = {
  AUTHENTICATE: '[user] Authenticate',
  AUTHENTICATE_SUCCESS: '[user] Authenticate success',
  AUTHENTICATE_ERROR: '[user] Authenticate error',
  GET_USER_INFO: '[user] get user info',
  GET_USER_INFO_SUCCESS: '[user] get user info success',
  GET_USER_INFO_ERROR: '[user] get user info error'
};

export class GetUserInfoAction implements Action {
  type = ActionTypes.GET_USER_INFO;
}

export class GetUserInfoSuccessAction implements Action {
  type = ActionTypes.GET_USER_INFO_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetUserInfoErrorAction implements Action {
  type = ActionTypes.GET_USER_INFO_ERROR;
}

export class AuthenticateAction implements Action {
  type = ActionTypes.AUTHENTICATE;

  constructor(public payload: AuthRequest) {
  }
}

export class AuthenticateSuccessAction implements Action {
  type = ActionTypes.AUTHENTICATE_SUCCESS;
}

export class AuthenticateErrorAction implements Action {
  type = ActionTypes.AUTHENTICATE_ERROR;
}

export type Actions = AuthenticateAction
  | AuthenticateSuccessAction
  | AuthenticateErrorAction
  | GetUserInfoAction
  | GetUserInfoErrorAction
  | GetUserInfoSuccessAction;
