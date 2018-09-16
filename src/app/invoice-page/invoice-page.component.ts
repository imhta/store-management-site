import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetAllInvoice} from '../shared/actions/invoice.actions';
import {StoreState} from '../shared/state/store.state';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../shared/models/invoice.model';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css']
})
export class InvoicePageComponent implements OnInit {
@Select( StoreState.uid ) storeUid$: Observable<string>;
@Select('invoices') allInvoice$: Observable<InvoiceModel[]>;
allInvoices: InvoiceModel[] = [];
  constructor(private store: Store) { }

  ngOnInit() {
    this.storeUid$.subscribe((storeUid) => this.store.dispatch([new GetAllInvoice(storeUid)]));
    this.allInvoice$.subscribe((allInvoices) =>    this.allInvoices = allInvoices);
  }

}
