import { Component, OnInit } from '@angular/core';
import { LOGIN_COMPONENT_ROUTER_PATH } from './app.routes';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './app.reducers';
import { GetUserInfoAction } from './core/state/user.actions';

@ Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private store: Store<State>) {

  }

  ngOnInit(): void {
    if (window.location.pathname === '/') {
      this.router.navigate([LOGIN_COMPONENT_ROUTER_PATH]);
    }
    this.store.dispatch(new GetUserInfoAction());
  }
}
