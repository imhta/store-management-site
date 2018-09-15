import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../service/firestore/firestore.service';

import {LoadingFalse} from './loading.state';
import {Navigate} from '@ngxs/router-plugin';
import {InvoiceModel} from '../models/invoice.model';
import {ErrorInSavingInvoice, InvoiceSavedSuccessfully, SaveInvoice} from '../actions/invoice.actions';


@State<InvoiceModel[]>({
  name: 'invoices',
  defaults: []
})
export class InvoicesState {
  constructor(private dbService: FirestoreService, private  store: Store) {
  }


  @Action(SaveInvoice)
  saveInvoice(cxt: StateContext<any[]>, {invoice}: SaveInvoice) {
    this.dbService
      .saveInvoice(invoice)
      .then(() => this.store.dispatch([new InvoiceSavedSuccessfully()]))
      .catch((err) => this.store.dispatch([new LoadingFalse(), new ErrorInSavingInvoice(err)]));
  }

  @Action(InvoiceSavedSuccessfully)
  invoiceSavedSuccessfully() {
    this.store.dispatch([new LoadingFalse(), new Navigate(['store'])]);
  }

  @Action(ErrorInSavingInvoice)
  getAllProducts(cxt: StateContext<any[]>, {err}: ErrorInSavingInvoice) {
    console.log(err);
  }


}
