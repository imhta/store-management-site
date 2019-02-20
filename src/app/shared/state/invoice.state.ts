import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../service/firestore/firestore.service';

import {LoadingFalse} from './app-general.state';
import {Navigate} from '@ngxs/router-plugin';
import {InvoiceModel} from '../models/invoice.model';
import {
  ErrorInGettingAllInvoice,
  ErrorInSavingInvoice,
  GetAllInvoice,
  GotAllInvoiceSuccessfully,
  InvoiceSavedSuccessfully, ReduceStock,
  SaveInvoice
} from '../actions/invoice.actions';
import {
  ErrorInGettingAllReturns,
  GetAllReturns,
  GetInvoice,
  GotAllReturnsSuccessfully,
  ReturnInvoice,
  ReturnStock
} from '../actions/return.actions';
import {ReturnModel} from '../models/return.model';
import {CheckCustomerExitsOrNot, CheckCustomerNewToStore} from '../actions/customers.actions';
import {Router} from '@angular/router';


@State<{ invoices: InvoiceModel[], returnBills: ReturnModel[] }>({
  name: 'bills',
  defaults: {
    invoices: [],
    returnBills: []
  }
})
export class InvoicesState {
  constructor(private dbService: FirestoreService, private  store: Store, private router: Router) {
  }


  @Action(SaveInvoice)
  saveInvoice(cxt: StateContext<any[]>, {invoice}: SaveInvoice) {
    this.dbService
      .saveInvoice(invoice)
      .then(() => this.store.dispatch([new ReduceStock(invoice), new InvoiceSavedSuccessfully()]))
      .catch((err) => this.store.dispatch([new LoadingFalse(), new ErrorInSavingInvoice(err)]));
  }

  @Action(InvoiceSavedSuccessfully)
  invoiceSavedSuccessfully() {
    const id = +this.router.routerState.snapshot.url.split('/')[3];
    this.store.dispatch([new LoadingFalse(), new Navigate([`go/u/${id}/invoice`])]);
  }

  @Action(ErrorInSavingInvoice)
  errorInSavingInvoice(cxt: StateContext<any[]>, {err}: ErrorInSavingInvoice) {
    console.log(err);
  }

  @Action(GetAllInvoice)
  getAllInvoice(cxt: StateContext<any>[], {storeUid}: GetAllInvoice) {
    this.dbService.getAllInvoice(storeUid)
      .then()
      .catch((err) => this.store.dispatch([new LoadingFalse(), new ErrorInGettingAllInvoice(err)]));
  }

  @Action(GotAllInvoiceSuccessfully)
  gotAllInvoiceSuccessfully(
    cxt: StateContext<{ invoices: InvoiceModel[], returnBills: ReturnModel[] }>,
    {allInvoices}: GotAllInvoiceSuccessfully
  ) {
    const state = cxt.getState();
    cxt.setState({...state, invoices: allInvoices});
    this.store.dispatch([new LoadingFalse()]);
  }

  @Action(ErrorInGettingAllInvoice)
  errorInGettingAllInvoice(cxt: StateContext<any[]>, {err}: ErrorInGettingAllInvoice) {
    console.log(err);
  }

  @Action(GetInvoice)
  getInvoice(cxt: StateContext<any[]>, {invoiceId}: GetInvoice) {
    this.dbService.getInvoice(invoiceId);
  }

  @Action(ReturnInvoice)
  returnInvoice(cxt: StateContext<any[]>, {returnInvoice}: ReturnInvoice) {
    this.dbService.returnInvoice(returnInvoice);
  }

  @Action(GetAllReturns)
  getAllReturns(cxt: StateContext<any>, {storeUid}: GetAllReturns) {
    this.dbService.getAllReturns(storeUid)
      .then()
      .catch((err) => this.store.dispatch([new LoadingFalse(), new ErrorInGettingAllReturns(err)]));
  }

  @Action(GotAllReturnsSuccessfully)
  gotAllReturnsSuccessfully(
    cxt: StateContext<{ invoices: InvoiceModel[], returnBills: ReturnModel[] }>, {allReturns}: GotAllReturnsSuccessfully) {
    const state = cxt.getState();
    cxt.setState({...state, returnBills: allReturns});
    this.store.dispatch([new LoadingFalse()]);
  }

  @Action(CheckCustomerExitsOrNot)
  checkCustomerExitsOrNot(cxt: StateContext<any>, {customerNumber}: CheckCustomerExitsOrNot) {
    this.dbService.checkCustomerExitsOrNot(customerNumber);
  }

  @Action(CheckCustomerNewToStore)
  checkCustomerNewToStore(cxt: StateContext<any>, {customerNumber, storeId}: CheckCustomerNewToStore) {
    this.dbService.checkCustomerNewToStore(storeId, customerNumber);
  }

  @Action(ReduceStock)
  reduceStock(cxt: StateContext<any[]>, {invoice}: ReduceStock) {
      this.dbService.reduceStock(invoice);
  }
  @Action(ReturnStock)
  returnStock(cxt: StateContext<any[]>, {returnInvoice}: ReturnStock) {
    this.dbService.returnStock(returnInvoice);
  }
}
