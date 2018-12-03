import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {LoadingTrue} from './shared/state/loading.state';
import {Authenticated, CheckAuthState, LoginSuccessful} from './shared/actions/auth.actions';
import {MediaMatcher} from '@angular/cdk/layout';
import {UserStoreState} from './shared/models/store.model';
import {EmptyLinkedStore, GetEmployeeLinkedStores, GetLinkedStores, ResetSelectedStore} from './shared/actions/store.actions';
import {Observable, Subscription} from 'rxjs';
import {AuthState} from './shared/state/auth.state';
import {UserModel} from './shared/models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  auth = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private  store: Store, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private actions$: Actions) {

    this.actions$.pipe(ofActionDispatched(LoginSuccessful, Authenticated)).subscribe(() => this.auth = true);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // installPwa(): void {
  //   this.Pwa.promptEvent.prompt();
  // }
}

