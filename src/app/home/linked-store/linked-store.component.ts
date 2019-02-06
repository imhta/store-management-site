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
    this.linkedStoreEmpty = false;

    this.storeSub$ = this.storeState$
      .subscribe((data) => {
        this.storeState = new UserStoreState(data);
        if (this.storeState.linkedStores) {
          this.linkedStoreEmpty = false;
        }
      });

    this.userSub$ = this.user$.pipe().subscribe((data) => {
      if (data) {
        this.user = data.valueOf();

      }
    });

    this.actions$
      .pipe(ofActionDispatched(EmptyLinkedStore))
      .subscribe(() => this.linkedStoreEmpty = true);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.storeState = null;
    this.linkedStoreEmpty = false;
    this.userSub$.unsubscribe();
    this.storeSub$.unsubscribe();
  }

  selectStore(index: number) {
    return this.store.dispatch([new LoadingTrue(), new SelectStore(index)]);
  }

  navigateToSetupStore() {
    return this.store.dispatch(new Navigate(['setup/store']));
  }
}
