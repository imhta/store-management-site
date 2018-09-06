import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ShopRegistrationForm} from '../../models/store.model';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {EmptyLinkedStore, GotLinkedStores} from '../../actions/store.actions';
import {SingleProductModel} from '../../models/product.model';

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
          return this.store.dispatch([new GotLinkedStores(this.stores)]);
        } else {
          return this.store.dispatch([ new EmptyLinkedStore()]);
        }
      });

  }
   setupNewStore(store: ShopRegistrationForm) {
    return  this.db.collection('stores')
      .add(store.toJson())
      .then((docRef) => this.db.collection('stores')
          .doc(`${docRef.id}`)
          .update({storeUid : docRef.id}));
  }

   uploadSingleProduct(product: SingleProductModel) {
    return  this.db.collection(`stores/${product.storeId}/products`)
      .add(product.toJson())
      .then((docRef) => this.db.collection(`stores/${product.storeId}/products`)
        .doc(`${docRef.id}`)
        .update({productUid : docRef.id}));
  }
}
