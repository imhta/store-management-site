import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../shared/models/invoice.model';
import {GetAllInvoice} from '../shared/actions/invoice.actions';
import {StoreState} from '../shared/state/store.state';
import {first} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';


@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {
  @Select(StoreState.uid) storeUid$: Observable<string>;
  @Select('invoices') allInvoice$: Observable<InvoiceModel[]>;
  allInvoices: InvoiceModel[] = [];
  uniqueCustomers: string[];
  selectedCustomer;
  changeCustomer = true;
  selectedCustomerValue: string;
  selectedCustomerData: InvoiceModel[] = [];
  constructor(public store: Store) {
  }

  ngOnInit() {
    this.storeUid$.pipe(first()).subscribe((storeUid) => this.store.dispatch([new GetAllInvoice(storeUid)]));
    this.allInvoice$.subscribe((allInvoices) => {
      this.allInvoices = allInvoices;
      this.findUniqueCustomers();
    });

  }

  findUniqueCustomers() {
    this.uniqueCustomers = [];

    this.allInvoices.filter((value, index, array) =>
      !array.filter((v, i) => value.customerNumber === v.customerNumber && i < index).length)
      .forEach((value) => this.uniqueCustomers.push(value.customerNumber));

    console.log(this.uniqueCustomers);
  }
  selectCustomer(i) {
    this.selectedCustomerData = [];
    this.selectedCustomer = i;
    this.changeCustomer = false;
    this.selectedCustomerValue = this.uniqueCustomers[this.selectedCustomer];
    this.selectedCustomerData = this.filterCustomerData();
  }
  toggleCustomer() {
    this.changeCustomer = true;
  }
  filterCustomerData() {
   return this.allInvoices.filter((invoice) => invoice.customerNumber === this.selectedCustomerValue);
  }

  navigateToSell() {
    this.store.dispatch([new Navigate(['sell'])]);
  }
}
