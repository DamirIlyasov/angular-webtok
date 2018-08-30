import { Injectable } from '@angular/core';
import { Room, StreamUrlResponse, Subscriber, SubscribersResponse } from '../../core/model/room';
import { API_URL } from '../../../environments/app.env';
import {
  CREATE_ROOM_PATH,
  GET_STREAM_URL_PATH,
  START_BROADCAST_PATH,
  STOP_BROADCAST_PATH,
  SUBSCRIBERS_PATH
} from '../../../environments/api-path-env';
import { HttpClient } from '@angular/common/http';

const CREATE_ROOM_URL = API_URL + CREATE_ROOM_PATH;
const GET_STREAM_URL = API_URL + GET_STREAM_URL_PATH;
const START_BROADCAST_URL = API_URL + START_BROADCAST_PATH;
const STOP_BROADCAST_URL = API_URL + STOP_BROADCAST_PATH;
const SUBSCRIBERS_URL = API_URL + SUBSCRIBERS_PATH;

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }

  createRoom(roomName: string) {
    return this.http.post<Room>(CREATE_ROOM_URL, {title: roomName});
  }

  getRoomInfo(roomId: string) {
    return this.http.get<Room>(CREATE_ROOM_URL + roomId);
  }

  getStreamUrl(roomId: string) {
    return this.http.get<StreamUrlResponse>(GET_STREAM_URL + roomId);
  }

  startBroadcast(roomId: string) {
    return this.http.post(START_BROADCAST_URL + roomId, null);
  }

  stopBroadcast(roomId: string) {
    return this.http.post(STOP_BROADCAST_URL + roomId, null);
  }

  getSubscribers(roomId: string) {
    return this.http.get<Subscriber[]>(SUBSCRIBERS_URL + roomId);
  }

  addSubscriber(roomId: string) {
    return this.http.post(SUBSCRIBERS_URL + roomId, null);
  }

  deleteSubscriber(roomId: string) {
    return this.http.delete(SUBSCRIBERS_URL + roomId);
  }
}
