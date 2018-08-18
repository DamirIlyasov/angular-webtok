import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ActionTypes,
  AuthenticateAction,
  AuthenticateErrorAction,
  AuthenticateSuccessAction,
  RegistrateAction,
  RegistrateErrorAction,
  RegistrateSuccessAction
} from '../state/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { DASHBOARD_COMPONENT_ROUTER_PATH } from '../../app.routes';

@Injectable()
export class UserEffects {

  @Effect()
  authenticate = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATE),
    switchMap((action: AuthenticateAction) => this.userService.login(action.payload).pipe(
      map(user => new AuthenticateSuccessAction(user)),
      catchError(() => of(new AuthenticateErrorAction()))
    ))
  );

  @Effect({dispatch: false})
  authenticateSuccess = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATE_SUCCESS, ActionTypes.REGISTRATE_SUCCESS),
    map(() => this.router.navigate([`/${DASHBOARD_COMPONENT_ROUTER_PATH}`]))
  );

  @Effect()
  registration = this.actions.pipe(
    ofType(ActionTypes.REGISTRATE),
    switchMap((action: RegistrateAction) => this.userService.registrate(action.payload).pipe(
      map(user => new RegistrateSuccessAction(user)),
      catchError(() => of(new RegistrateErrorAction()))
    ))
  );

  constructor(private actions: Actions, private userService: UserService, private router: Router) {
  }
}
