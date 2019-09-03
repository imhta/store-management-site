import {Component, OnInit} from '@angular/core';
import {fromEvent, merge, Observable, of, Subscription} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {OpenSnackBarWithoutCustomAction} from './shared/state/app-general.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  online$: Observable<boolean>;
  onlineSub: Subscription;
  // installPwa(): void {
  //   this.Pwa.promptEvent.prompt();
  // }
  constructor(private store: Store) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    this.onlineSub = this.online$
      .subscribe((online) =>
        online ?
        this.store.dispatch(
          new OpenSnackBarWithoutCustomAction('App is online')
        ) : this.store.dispatch(
          new OpenSnackBarWithoutCustomAction('App is offline')
        )
      )
    ;
  }

}

