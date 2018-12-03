import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../shared/models/invoice.model';
import {GetAllInvoice} from '../shared/actions/invoice.actions';
import {StoreState} from '../shared/state/store.state';
import {first} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {ReturnModel} from '../shared/models/return.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {
  @Select(StoreState.uid) storeUid$: Observable<string>;
  @Select('bills') allInvoice$: Observable<{ invoices: InvoiceModel[], returnBills: ReturnModel[] }>;
  allInvoices: InvoiceModel[] = [];
  uniqueCustomers: string[];
  selectedCustomer;
  changeCustomer = true;
  selectedCustomerValue: string;
  selectedCustomerData: InvoiceModel[] = [];
  constructor(public store: Store, private router: Router) {
  }

  ngOnInit() {
    this.storeUid$.pipe(first()).subscribe((storeUid) => this.store.dispatch([new GetAllInvoice(storeUid)]));
    this.allInvoice$.subscribe((allInvoices) => {
      this.allInvoices = allInvoices.invoices;
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
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    return this.store.dispatch([new Navigate([`u/${id}/sell`])]);
  }
}