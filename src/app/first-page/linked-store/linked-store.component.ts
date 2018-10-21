import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {
  EmptyLinkedStore,
  GetEmployeeLinkedStores,
  GetLinkedStores,
  ResetSelectedStore,
  SelectStore
} from '../../shared/actions/store.actions';
import {Observable, Subscription} from 'rxjs';
import {UserStoreState} from '../../shared/models/store.model';
import {LoadingTrue} from '../../shared/state/loading.state';
import {Logout} from '../../shared/actions/auth.actions';
import {UserModel} from '../../shared/models/auth.model';
import {Register} from 'ts-node';
import {AuthState} from '../../shared/state/auth.state';

@Component({
  selector: 'app-linked-store',
  templateUrl: './linked-store.component.html',
  styleUrls: ['./linked-store.component.css']
})
export class LinkedStoreComponent implements OnInit, OnDestroy {
  @Select('storeState') storeState$: Observable<UserStoreState>;
  @Select(AuthState.role) role$: Observable<string>;
  @Select('user') user$;
  user: UserModel;
  storeState: UserStoreState;
  linkedStoreEmpty: boolean;
  userSub$: Subscription;
  storeSub$: Subscription;


  constructor(private store: Store, private actions$: Actions) {

  }

  ngOnInit() {
    this.linkedStoreEmpty = false;

    this.storeSub$ = this.storeState$
      .subscribe((data) => this.storeState = new UserStoreState(data.valueOf()));

    this.userSub$ = this.user$.pipe().subscribe((data) => {
      if (data) {
        this.user = data.valueOf();

      }
    });

    this.role$.subscribe((role) => {
      if (role === 'Register' && !this.user.isEmployee) {
        this.store.dispatch([new LoadingTrue(), new ResetSelectedStore(null), new GetLinkedStores(this.user['uid'])]);
      } else if (role !== undefined || null && this.user.isEmployee) {
        this.store.dispatch([new LoadingTrue(), new ResetSelectedStore(null), new GetEmployeeLinkedStores(this.user['employeeOf'])]);
      } else if ((role && this.user.isEmployee && this.user.isRegister) === undefined || null) {
        this.linkedStoreEmpty = true;
        this.store.dispatch([new EmptyLinkedStore()]);
      }

    });
    this.actions$
      .pipe(ofActionDispatched(EmptyLinkedStore))
      .subscribe(() => this.linkedStoreEmpty = true);
  }

  ngOnDestroy() {
    this.storeState = null;
    this.linkedStoreEmpty = false;
    this.userSub$.unsubscribe();
    this.storeSub$.unsubscribe();
  }

  navigateToSetupStore() {
    return this.store.dispatch(new Navigate(['store/setup']));
  }

  selectStore(index: number) {
    return this.store.dispatch([new LoadingTrue(), new SelectStore(index)]);
  }

  logout() {
    return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }

}
