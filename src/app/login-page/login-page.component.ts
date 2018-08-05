import { AppState } from '../models/app-state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../models/auth.model';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  error;
  loading;
  windowHeight;
  constructor(private store: Store<AppState>, private router: Router) {
   }

  ngOnInit() {
   this.windowHeight =  window.screen.height + 'px';
  }
  ngOnDestroy() {  }

  login() {
    this.loading = true;
    return this.store.dispatch(new AuthActions.Login());
  }
}
