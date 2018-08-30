import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ActionTypes,
  AuthenticateAction,
  AuthenticateErrorAction,
  AuthenticateSuccessAction,
  GetUserInfoAction,
  GetUserInfoErrorAction,
  GetUserInfoSuccessAction
} from '../state/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { DASHBOARD_COMPONENT_ROUTER_PATH, LOGIN_COMPONENT_ROUTER_PATH } from '../../app.routes';

@Injectable()
export class UserEffects {

  @Effect()
  authenticate = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATE),
    switchMap((action: AuthenticateAction) => this.userService.login(action.payload).pipe(
      map(response => {
        this.storageService.setAuth(response);
        return new AuthenticateSuccessAction();
      }),
      catchError(() => of(new AuthenticateErrorAction()))
    ))
  );

  @Effect()
  authenticateSuccess = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATE_SUCCESS),
    map(() => new GetUserInfoAction())
  );

  @Effect()
  getUserInfo = this.actions.pipe(
    ofType(ActionTypes.GET_USER_INFO),
    switchMap(() => this.userService.getUserInfo().pipe(
      map(user => new GetUserInfoSuccessAction(user)),
      catchError(() => of(new GetUserInfoErrorAction()))
    ))
  );

  @Effect({dispatch: false})
  getUserInfoSuccess = this.actions.pipe(
    ofType(ActionTypes.GET_USER_INFO_SUCCESS),
    map(() => {
      if (this.router.url.startsWith(`/${LOGIN_COMPONENT_ROUTER_PATH}`)) {
        this.router.navigate([`/${DASHBOARD_COMPONENT_ROUTER_PATH}`]);
      }
    })
  );

  @Effect({dispatch: false})
  getUserInfoError = this.actions.pipe(
    ofType(ActionTypes.GET_USER_INFO_ERROR),
    map(() => {
      if (this.router.url.startsWith(`/${DASHBOARD_COMPONENT_ROUTER_PATH}`)) {
        this.router.navigate([`/${LOGIN_COMPONENT_ROUTER_PATH}`]);
      }
    })
  );

  constructor(private actions: Actions, private userService: UserService, private router: Router,
              private storageService: StorageService) {
  }
}
