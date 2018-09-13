import {Component, OnInit} from '@angular/core';
import {Store, Select, Actions, ofActionDispatched} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {
  EmptyLinkedStore,
  GetEmployeeLinkedStores,
  GetLinkedStores,
  ResetSelectedStore,
  SelectStore
} from '../../shared/actions/store.actions';
import {Observable} from 'rxjs';
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
export class LinkedStoreComponent implements OnInit {
  @Select('storeState') storeState$: Observable<UserStoreState>;
  @Select(AuthState.role) role$: Observable<string>;
  @Select('user') user$;
  user: UserModel;
  storeState: UserStoreState;
  linkedStoreEmpty: boolean;


  constructor(private store: Store, private actions$: Actions) {
  }

  ngOnInit() {
    this.linkedStoreEmpty = false;

    this.storeState$
      .subscribe((data) => this.storeState = new UserStoreState(data.valueOf()));

    this.user$.pipe().subscribe((data) => {
      if (data) {
        this.user = data.valueOf();

      }
    });
    this.role$.subscribe((role) => {
      if (role === 'Register') {
        this.store.dispatch([new LoadingTrue(), new ResetSelectedStore(null), new GetLinkedStores(this.user['uid'])]);
      } else {
        this.store.dispatch([new LoadingTrue(), new ResetSelectedStore(null), new GetEmployeeLinkedStores(this.user['employeeOf'])]);


      }

    });
    this.actions$
      .pipe(ofActionDispatched(EmptyLinkedStore))
      .subscribe(() => this.linkedStoreEmpty = true);


  }

  navigateToSetupStore() {
    return this.store.dispatch(new Navigate(['store/setup']));
  }

  selectStore(index: number) {
    console.log(index);
    return this.store.dispatch([new LoadingTrue(), new SelectStore(index)]);
  }

  logout() {
    return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }
}
