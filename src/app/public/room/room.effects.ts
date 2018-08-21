import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RoomService } from './room.service';
import {
  ActionTypes,
  GetRoomInfoAction, GetRoomInfoErrorAction,
  GetRoomInfoSuccessAction,
  RoomCreateAction,
  RoomCreatedAction, RoomCreateErrorAction
} from './room.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class RoomEffects {

  @Effect()
  createRoom = this.actions.pipe(
    ofType(ActionTypes.ROOM_CREATE),
    switchMap((action: RoomCreateAction) => this.roomService.createRoom(action.payload).pipe(
      map(room => new RoomCreatedAction(room)),
      catchError(() => of(new RoomCreateErrorAction()))
    ))
  );

  @Effect({dispatch: false})
  roomCreated = this.actions.pipe(
    ofType(ActionTypes.ROOM_CREATED),
    map((action: RoomCreatedAction) => this.router.navigate([`/room/${action.payload.roomKey}`]))
  );

  @Effect()
  getRoomInfo = this.actions.pipe(
    ofType(ActionTypes.ROOM_GET_INFO),
    switchMap((action: GetRoomInfoAction) => this.roomService.getRoomInfo(action.payload.roomKey).pipe(
      map(room => new GetRoomInfoSuccessAction(room)),
      catchError(() => of(new GetRoomInfoErrorAction()))
    ))
  );

  constructor(private actions: Actions, private roomService: RoomService, private router: Router) {
  }
}
