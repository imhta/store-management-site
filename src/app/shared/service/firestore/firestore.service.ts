import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ShopRegistrationForm} from '../../models/store.model';
import {Store} from '@ngxs/store';
import {
  EmptyLinkedStore,
  ErrorInGettingEmployeeLinkedStore,
  GotAllEmployeesSuccessfully,
  GotEmployeeLinkedStoresSuccessfully,
  GotLinkedStores
} from '../../actions/store.actions';
import {SingleProductModel} from '../../models/product.model';
import {GetAllProductsError, GotAllProducts, ProductFounded} from '../../actions/product.actions';
import {ExtraUser} from '../../models/auth.model';
import {InvoiceModel} from '../../models/invoice.model';
import {GotAllInvoiceSuccessfully} from '../../actions/invoice.actions';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  stores: any[];
  employees: any[];
  allProducts: any[];
  resultProducts: any[];
  allInvoice: InvoiceModel[];

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
      .then((docRef) => docRef.update({storeUid: docRef.id}));
  }

  uploadSingleProduct(product: SingleProductModel) {
    return this.db.collection(`products`)
      .add(product.toJson())
      .then((docRef) => docRef.update({productUid: docRef.id}));
  }

  getAllProducts(storeId: string) {
    return this.db.collection(`products`).ref
      .where('storeId', '==', `${storeId}`)
      .where('isDeleted', '==', false)
      .get().then((data) => {
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
        this.db.collection(`products`).ref
          .where('storeId', '==', `${storeUid}`)
          .where('isDeleted', '==', false)
          .where('prn', '==', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;
      case 'Product name':
        this.db.collection(`products`).ref
          .where('storeId', '==', `${storeUid}`)
          .where('isDeleted', '==', false)
          .where('productName', '==', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;
      case 'Description':
        this.db.collection(`products`).ref
          .where('storeId', '==', `${storeUid}`)
          .where('isDeleted', '==', false)
          .where('description', '==', keyword).onSnapshot((result) => {
          this.resultProducts = [];
          result.forEach((product) => {
            this.resultProducts.push(product.data());
            this.store.dispatch([new ProductFounded(this.resultProducts)]);
          });
        });
        break;

    }
  }

  deleteProduct(productUid) {
    return this.db.collection(`products`).ref
      .doc(`${productUid}`).update('isDeleted', true);
  }

  addingExtraUser(extraUser: ExtraUser) {
    return this.db.collection('users').doc(`${extraUser.email}`).set(extraUser.toJson(), {merge: true});
  }

  deleteExtraUser(email: string) {
    return this.db.collection('users').doc(`${email}`).delete();
  }

  getExtraUser(storeUid: string) {
    this.employees = [];
    this.db.collection('users').ref.where('employeeOf', 'array-contains', storeUid).get().then((users) => {
      users.forEach((user) => {
        this.employees.push(user.data());
      });

    }).then(() => this.store.dispatch([new GotAllEmployeesSuccessfully(this.employees)]));
  }

  GetEmployeeLinkedStore(stores: string[]) {
    this.stores = [];
    stores.forEach((storeUid) => {
      this.db.collection('stores').doc(`${storeUid}`).ref.get().then((store) => {
        if (store.exists) {
          this.stores.push(store.data());
          console.log(this.stores);
        }
      }).then(() => this.store.dispatch([new GotEmployeeLinkedStoresSuccessfully(this.stores)])
      ).catch((err) => {
        this.store.dispatch([new ErrorInGettingEmployeeLinkedStore(err)]);
        console.log(err);
      });
    });


  }

  saveInvoice(invoice: InvoiceModel) {
    return this.db
      .collection(`stores/${invoice.storeUid}/invoices`)
      .add(invoice.toJson())
      .then((docRef) => docRef.update({invoiceId: docRef.id}));
  }

  async getAllInvoice(storeUid: string) {
    return this.db.collection(`stores/${storeUid}/invoices`).ref.get().then((invoices) => {
      this.allInvoice = [];
      invoices.forEach((data) => {
        const invoice = new InvoiceModel();
        invoice.fromJson(data.data());
        this.allInvoice.push(invoice);
      });
      this.store.dispatch([new GotAllInvoiceSuccessfully(this.allInvoice)]);
    });
  }
}
