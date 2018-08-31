import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ShopRegistrationForm} from '../../models/store.model';
import {Select} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  @Select(AuthState.uid) uid$: Observable<string>;
  uid;
  constructor(private db: AngularFirestore) {}

  getLinkedStore() {
    this.uid$
      .pipe(take(1))
      .subscribe((uid) => this.uid = uid);
    this.db.collection('stores').ref
      .where('registerUid', '==', this.uid)
      .onSnapshot(data => {console.log(data.size); });
  }
  setupNewStore(store: ShopRegistrationForm) {
    return this.db.collection('stores').add(store.toJson());
  }
}
