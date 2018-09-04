import { Component, OnInit } from '@angular/core';
import {Store, Select, Actions, ofActionDispatched} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {EmptyLinkedStore, GetLinkedStores, ResetSelectedStore, SelectStore} from '../shared/actions/store.actions';
import {Observable} from 'rxjs';
import {UserStoreState} from '../shared/models/store.model';
import {LoadingTrue} from '../shared/state/loading.state';
import {Logout} from '../shared/actions/auth.actions';
import {UserModel} from '../shared/models/auth.model';


@Component({
  selector: 'app-linked-store',
  templateUrl: './linked-store.component.html',
  styleUrls: ['./linked-store.component.css']
})
export class LinkedStoreComponent implements OnInit {
  @Select('storeState') storeState$: Observable<UserStoreState>;
  @Select('user') user$;
  user: UserModel;
  storeState: UserStoreState;
  linkedStoreEmpty: boolean;

  constructor(private store: Store, private actions$: Actions) {

  }

 ngOnInit() {
    this.linkedStoreEmpty = false;
   this.user$.subscribe((data) => this.user = data.valueOf());
   this.store.dispatch([new LoadingTrue(), new ResetSelectedStore(null), new GetLinkedStores()]);
   this.actions$
     .pipe(ofActionDispatched(EmptyLinkedStore))
     .subscribe(() => this.linkedStoreEmpty = true );
   this.storeState$.subscribe((data) => this.storeState = new UserStoreState(data.valueOf()));

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
