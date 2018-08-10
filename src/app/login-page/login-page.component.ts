import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngxs/store';
import {Login} from '../shared/actions/auth.actions';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loading;
  windowHeight;
  constructor( private router: Router, private store: Store) {
   }

  ngOnInit() {
    this.windowHeight =  window.screen.height + 'px';
  }
  ngOnDestroy() {  }
  login() {this.store.dispatch(new Login()); }

}
