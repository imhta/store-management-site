import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../service/auth.service';
export type Action = authActions.All;
@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService) {}

  @Effect()
  login: Observable<Action> = this.actions
    .ofType(authActions.LOGIN)
    .pipe(mergeMap(() => this.authService.googleLogin()))
    .pipe(
      map(data => {
        if (data) {
          return new authActions.LoginSuccess(data);
        } else {
          console.log('failed');
          return new authActions.LoginFailed();
        }
      })
    );

  @Effect()
  logout: Observable<Action> = this.actions.ofType(authActions.LOGOUT).pipe(
    tap(() => this.authService.signOut()),
    map(() => new authActions.LogoutSuccess(null))
  );
}
