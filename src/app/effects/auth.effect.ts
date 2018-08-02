import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
export type Action = authActions.All;

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {}

  @Effect()
  getPost: Observable<Action> = this.actions
    .ofType(authActions.CHECK_SID)
    .pipe(map((action: authActions.CheckSid) => action.payload))
    .pipe(
      mergeMap(payload =>
        this.db
          .collection('stores')
          .doc(payload)
          .ref.get()
          .then(sid => sid)
      )
    )
    .pipe(
      map(sid => {
        if (sid.exists) {
          return new authActions.SidFound(sid.data()['sid']);
        } else {
          return new authActions.SidNotFound();
        }
      })
    );
}
