import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ShopRegistrationForm} from '../../models/store.model';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {EmptyLinkedStore, GotLinkedStores} from '../../actions/store.actions';
import {LoadingFalse} from '../../state/loading.state';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  @Select(AuthState.uid) uid$: Observable<string>;
  uid;
  stores: any[];

  constructor(private db: AngularFirestore, private  store: Store) {}

  async getLinkedStore() {
    this.stores = [];
    await this.uid$
      .pipe(take(1))
      .subscribe((uid) => this.uid = uid);
    await this.db.collection('stores').ref
      .where('registerUid', '==', this.uid)
      .get()
      .then((data) =>  {
        if (!data.empty) {
          data.forEach((store) => this.stores.push(store.data()));
          return this.store.dispatch([new LoadingFalse(), new GotLinkedStores(this.stores)]);
        } else {
          return this.store.dispatch([new LoadingFalse(), new EmptyLinkedStore()]);
        }
      });

  }
  setupNewStore(store: ShopRegistrationForm) {
    return this.db.collection('stores').add(store.toJson());
  }
}
