import {Component, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserStoreState} from '../../shared/models/store.model';
import {AuthState} from '../../shared/state/auth.state';
import {LoadingTrue} from '../../shared/state/loading.state';
import {
  ErrorInReturningInvoice,
  GetInvoice,
  GotInvoiceSuccessfully,
  InvoiceNotFound,
  ReturnedInvoiceSuccessfully,
  ReturnInvoice
} from '../../shared/actions/return.actions';
import {InvoiceModel} from '../../shared/models/invoice.model';
import {take} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {ReturnModel} from '../../shared/models/return.model';


@Component({
  selector: 'app-return-products',
  templateUrl: './return-products.component.html',
  styleUrls: ['./return-products.component.css']
})
export class ReturnProductsComponent implements OnInit {
  @Select('storeState') storeState$: Observable<object>;
  @Select(AuthState.uid) uid$: Observable<string>;
  userUid: string;
  storeDataSubscription: Subscription;
  storeState: UserStoreState;
  currentStore;
  invoiceId: string;
  invoiceNotFound = false;
  selectedCartProducts: object[] = [];
  tempInvoice: InvoiceModel;
  hasErrorWhileReturning = false;

  constructor(private store: Store, private action$: Actions) {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      this.currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
    });
    this.uid$.subscribe((uid) => this.userUid = uid);
  }

  ngOnInit() {
  }

  getInvoice() {
    this.store.dispatch([this.store.dispatch([new LoadingTrue(), new GetInvoice(this.invoiceId)])]);
    this.action$.pipe(ofActionDispatched(GotInvoiceSuccessfully)).subscribe(({invoice}) => this.tempInvoice = invoice);
    this.action$.pipe(ofActionDispatched(InvoiceNotFound), take(1)).subscribe(() => this.invoiceNotFound = true);
  }

  isSelected(product): boolean {
    return this.selectedCartProducts.filter(v => v === product).length !== 0;
  }

  addToSelectedProducts(selectedProduct) {
    this.selectedCartProducts.push(selectedProduct);
  }

  deselectProducts(deselectedProduct) {
    this.selectedCartProducts = this.selectedCartProducts.filter(v => v !== deselectedProduct);
  }

  getInvoiceId(invoiceId: string) {
    this.invoiceId = invoiceId;
  }

  returnSpecific() {
    const returnInvoice = new ReturnModel({
      'customerNumber': this.tempInvoice.customerNumber,
      'invoiceId': this.invoiceId,
      'storeUid': this.currentStore['storeUid'],
      'cartProducts': this.selectedCartProducts,
      'isAllReturn': this.tempInvoice.cartProducts.length === this.selectedCartProducts.length,
      'returnApprovedBy': this.userUid
    });
    this.store.dispatch([new LoadingTrue(), new ReturnInvoice(returnInvoice)]);
    this.action$
      .pipe(ofActionDispatched(ReturnedInvoiceSuccessfully), take(1))
      .subscribe(() => this.store.dispatch([new Navigate(['store'])]));
    this.action$
      .pipe(ofActionDispatched(ErrorInReturningInvoice), take(1))
      .subscribe(({err}) => this.hasErrorWhileReturning = true);
  }

  returnAll() {

    const returnInvoice = new ReturnModel({
      'customerNumber': this.tempInvoice.customerNumber,
      'invoiceId': this.invoiceId,
      'storeUid': this.currentStore['storeUid'],
      'cartProducts': this.tempInvoice.cartProducts,
      'isAllReturn': true,
      'returnApprovedBy': this.userUid
    });
    this.store.dispatch([new LoadingTrue(), new ReturnInvoice(returnInvoice)]);
    this.action$
      .pipe(ofActionDispatched(ReturnedInvoiceSuccessfully), take(1))
      .subscribe(() => this.store.dispatch([new Navigate(['store'])]));
    this.action$
      .pipe(ofActionDispatched(ErrorInReturningInvoice), take(1))
      .subscribe(({err}) => this.hasErrorWhileReturning = true);

  }
}
