import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RoomService } from './room.service';
import { ActionTypes, RoomCreateAction, RoomCreatedAction } from './room.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class RoomEffects {

  @Effect()
  createRoom = this.actions.pipe(
    ofType(ActionTypes.ROOM_CREATE),
    switchMap((action: RoomCreateAction) => this.roomService.createRoom(action.payload).pipe(
      map(room => new RoomCreatedAction(room)),
      catchError(() => of(''))
    ))
  );

  @Effect({dispatch: false})
  roomcreated = this.actions.pipe(
    ofType(ActionTypes.ROOM_CREATED),
    map((action: RoomCreatedAction) => this.router.navigate([`/room/${action.payload.roomKey}`]))
  );

  constructor(private actions: Actions, private roomService: RoomService, private router: Router) {
  }
}
