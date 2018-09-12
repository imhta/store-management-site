import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ShopRegistrationForm} from '../../models/store.model';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {
  EmptyLinkedStore,
  ErrorInGettingEmployeeLinkedStore,
  GotEmployeeLinkedStoresSuccessfully,
  GotLinkedStores
} from '../../actions/store.actions';
import {SingleProductModel} from '../../models/product.model';
import {GetAllProductsError, GotAllProducts, ProductFounded} from '../../actions/product.actions';
import {ExtraUser} from '../../models/auth.model';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  stores: any[];
  allProducts: any[];
  resultProducts: any[];

  constructor(private db: AngularFirestore, private  store: Store) {
  }

  async getLinkedStore(uid) {
    this.stores = [];
    await this.db.collection('stores').ref
      .where('registerUid', '==', uid)
      .get()
      .then((data) => {
        if (!data.empty) {
          data.forEach((store) => this.stores.push(store.data()));
          return this.store.dispatch([new GotLinkedStores(this.stores)]);
        } else {
          return this.store.dispatch([new EmptyLinkedStore()]);
        }
      });

  }

  setupNewStore(store: ShopRegistrationForm) {
    return this.db.collection('stores')
      .add(store.toJson())
      .then((docRef) => this.db.collection('stores')
        .doc(`${docRef.id}`)
        .update({storeUid: docRef.id}));
  }

  uploadSingleProduct(product: SingleProductModel) {
    return this.db.collection(`stores/${product.storeId}/products`)
      .add(product.toJson())
      .then((docRef) => this.db.collection(`stores/${product.storeId}/products`)
        .doc(`${docRef.id}`)
        .update({productUid: docRef.id}));
  }

  getAllProducts(storeId: string) {
    return this.db.collection(`stores/${storeId}/products`)
      .ref.get().then((data) => {
        this.allProducts = [];
        data.forEach((product) => {
          this.allProducts.push(product.data());
        });
        this.store.dispatch([new GotAllProducts(this.allProducts)]);
      }).catch((err) => {
        console.log(err);
        this.store.dispatch([new GetAllProductsError(err)]);
      });
  }

  searchForProduct(storeUid, keyword, searchOption) {
    console.log(storeUid, keyword, searchOption);
    switch (searchOption) {
      case 'Product id':
        this.db.collection(`stores/${storeUid}/products`).ref.where('prn', '==', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;
      case 'Product name':
        this.db.collection(`stores/${storeUid}/products`).ref.where('productName', '==', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;
      case 'Description':
        this.db.collection(`stores/${storeUid}/products`).ref.where('description', '==', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;
      case 'Tags':
        this.db.collection(`stores/${storeUid}/products`).ref.where('tags', 'array-contains', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;
    }
  }

  deleteProduct(storeId, productUid) {
    return this.db.collection(`stores/${storeId}/products`).doc(`${productUid}`).delete();
  }

  addingExtraUser(extraUser: ExtraUser) {
    return this.db.collection('users').doc(`${extraUser.email}`).set(extraUser.toJson(), {merge: true});
  }

  deleteExtraUser(email: string) {
    return this.db.collection('users').doc(`${email}`).delete();
  }

  GetEmployeeLinkedStore(stores: string[]) {
    this.stores = [];
    stores.forEach((storeUid) => {
      this.db.collection('stores').doc(`${storeUid}`).ref.get().then((store) => {
        if (store.exists) {
          this.stores.push(store.data());
        }
      }).catch((err) => {this.store.dispatch([new ErrorInGettingEmployeeLinkedStore(err)]);
      console.log(err); });
    });
    this.store.dispatch([new GotEmployeeLinkedStoresSuccessfully(this.stores)]);
  }
}
