import { AppState } from '../models/app-state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../models/auth.model';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user$: Observable<User>;
  error;
  loading;
  windowHeight;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select('user');
    this.user$.subscribe((data) =>
      console.log(data)
    );
  }

  ngOnInit() {
   this.windowHeight =  window.screen.height + 'px';
  }

  login() {
    return this.store.dispatch(new AuthActions.Login());
  }
}
