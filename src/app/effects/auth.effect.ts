import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, mergeMap, tap, delay } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../service/auth.service';
import { Router } from '../../../node_modules/@angular/router';
export type Action = authActions.All;

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

  @Effect()
  login: Observable<Action> = this.actions
    .ofType(authActions.LOGIN)
    .pipe(
      mergeMap(() => this.authService.googleLogin()),
      delay(2000),
      map(data => {
        if (data) {
          return new authActions.LoginSuccess(data);
        } else {
          console.log('failed');
          return new authActions.LoginFailed();
        }
      }),
      tap((data) => data.type === 'Logedin successfully' ? this.router.navigate(['/home']) : null )
    );

  @Effect()
  logout: Observable<Action> = this.actions.ofType(authActions.LOGOUT).pipe(
    tap(() => this.authService.signOut()),
    delay(3000),
    map(() => new authActions.LogoutSuccess(null)),
    tap(() => this.router.navigate(['']))
  );


}
