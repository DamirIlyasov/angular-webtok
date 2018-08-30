import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RoomService } from './room.service';
import {
  ActionTypes,
  GetRoomInfoAction,
  GetRoomInfoErrorAction,
  GetRoomInfoSuccessAction,
  GetStreamUrlAction,
  GetStreamUrlErrorAction,
  GetStreamUrlSuccessAction,
  GetSubscribersAction,
  GetSubscribersErrorAction,
  GetSubscribersSuccessAction,
  RoomCreateAction,
  RoomCreatedAction,
  RoomCreateErrorAction,
  StartBroadcastAction,
  StartBroadcastErrorAction,
  StartBroadcastSuccessAction,
  StopBroadcastAction,
  StopBroadcastErrorAction,
  StopBroadcastSuccessAction,
  SubscribeAction,
  SubscribeErrorAction,
  SubscribeSuccessAction,
  UnsubscribeAction,
  UnsubscribeErrorAction,
  UnsubscribeSuccessAction
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
    map((action: RoomCreatedAction) => this.router.navigate([`/room/${action.payload.id}`]))
  );

  @Effect()
  getRoomInfo = this.actions.pipe(
    ofType(ActionTypes.ROOM_GET_INFO),
    switchMap((action: GetRoomInfoAction) => this.roomService.getRoomInfo(action.payload.roomId).pipe(
      map(room => new GetRoomInfoSuccessAction(room)),
      catchError(() => of(new GetRoomInfoErrorAction()))
    ))
  );

  @Effect()
  getStreamUrl = this.actions.pipe(
    ofType(ActionTypes.ROOM_GET_STREAM_URL),
    switchMap((action: GetStreamUrlAction) => this.roomService.getStreamUrl(action.payload.roomId).pipe(
      map(response => new GetStreamUrlSuccessAction(response.broadcast_url)),
      catchError(() => of(new GetStreamUrlErrorAction()))
    ))
  );

  @Effect()
  startBroadcast = this.actions.pipe(
    ofType(ActionTypes.BROADCAST_START),
    switchMap((action: StartBroadcastAction) => this.roomService.startBroadcast(action.payload.roomId).pipe(
      map(() => new StartBroadcastSuccessAction()),
      catchError(() => of(new StartBroadcastErrorAction()))
    ))
  );

  @Effect()
  stopBroadcast = this.actions.pipe(
    ofType(ActionTypes.BROADCAST_STOP),
    switchMap((action: StopBroadcastAction) => this.roomService.stopBroadcast(action.payload.roomId).pipe(
      map(() => new StopBroadcastSuccessAction()),
      catchError(() => of(new StopBroadcastErrorAction()))
    ))
  );

  @Effect()
  getSubscribers = this.actions.pipe(
    ofType(ActionTypes.GET_SUBSCRIBERS),
    switchMap((action: GetSubscribersAction) => this.roomService.getSubscribers(action.payload.roomId).pipe(
      map(subscribers => new GetSubscribersSuccessAction(subscribers)),
      catchError(() => of(new GetSubscribersErrorAction()))
    ))
  );

  @Effect()
  subscribe = this.actions.pipe(
    ofType(ActionTypes.ADD_SUBSCRIBER),
    switchMap((action: SubscribeAction) => this.roomService.addSubscriber(action.payload.roomId).pipe(
      map(() => new SubscribeSuccessAction()),
      catchError(() => of(new SubscribeErrorAction()))
    ))
  );

  @Effect()
  unsubscribe = this.actions.pipe(
    ofType(ActionTypes.DELETE_SUBSCRIBER),
    switchMap((action: UnsubscribeAction) => this.roomService.deleteSubscriber(action.payload.roomId).pipe(
      map(() => new UnsubscribeSuccessAction()),
      catchError(() => of(new UnsubscribeErrorAction()))
    ))
  );

  constructor(private actions: Actions, private roomService: RoomService, private router: Router) {
  }
}
