import { Component, OnInit } from '@angular/core';
import { LOGIN_COMPONENT_ROUTER_PATH } from './app.routes';
import { Router } from '@angular/router';

@ Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (window.location.pathname === '/') {
      this.router.navigate([LOGIN_COMPONENT_ROUTER_PATH]);
    }
  }
}
