import {Injectable} from '@angular/core';

import {Resolve} from '@angular/router';
import {Store} from '@ngxs/store';


@Injectable()
export class StoreResolver implements Resolve<any> {
  // @Select('storeState') storeState$: Observable<object>;
  // @Select('allProducts') allProducts$: Observable<any[]>;
  // storeDataSubscription: Subscription;
  // storeState: UserStoreState;
  // currentStore;
  // allProducts: any[];


  constructor(private store: Store) {

  }

  resolve() {
    return 'resolved';
  }


}
