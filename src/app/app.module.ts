import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PublisherComponent } from './component/publisher/publisher.component';
import { SubscriberComponent } from './component/subscriber/subscriber.component';
import { StreamComponent } from './component/stream/stream.component';
import { FormsModule } from '@angular/forms';
import { PublicComponent } from './public/public.component';
import { RouterModule, Routes } from '@angular/router';
import {
  DASHBOARD_COMPONENT_ROUTER_PATH,
  LOGIN_COMPONENT_ROUTER_PATH,
  PUBLIC_COMPONENT_ROUTER_PATH,
  REGISTRATION_COMPONENT_ROUTER_PATH,
  ROOM_COMPONENT_ROUTER_PATH
} from './app.routes';
import { LoginComponent } from './public/login/login.component';
import { RegistrationComponent } from './public/registration/registration.component';
import { RoomComponent } from './public/room/room.component';
import { DashboardComponent } from './authorized/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducer as userReducer } from './core/state/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './core/effects/user.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

const ROUTES: Routes = [
  {
    path: PUBLIC_COMPONENT_ROUTER_PATH,
    component: PublicComponent,
    children: [
      {path: LOGIN_COMPONENT_ROUTER_PATH, component: LoginComponent},
      {path: REGISTRATION_COMPONENT_ROUTER_PATH, component: RegistrationComponent},
      {path: ROOM_COMPONENT_ROUTER_PATH, component: RoomComponent}
    ]
  },
  {
    path: DASHBOARD_COMPONENT_ROUTER_PATH,
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent,
    StreamComponent,
    PublicComponent,
    LoginComponent,
    RegistrationComponent,
    RoomComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({
      user: userReducer
    }),
    EffectsModule.forRoot([
      UserEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
