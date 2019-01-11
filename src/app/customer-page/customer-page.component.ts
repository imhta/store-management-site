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
import {FirestoreService} from '../shared/service/firestore/firestore.service';


@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {
  @Select(StoreState.uid) storeUid$: Observable<string>;
  @Select('bills') allInvoice$: Observable<{ invoices: [], returnBills: ReturnModel[] }>;
  allInvoices = [];
  uniqueCustomers: string[];
  selectedCustomer;
  changeCustomer = true;
  selectedCustomerValue: string;
  selectedCustomerInvoiceData = [];
  selectedCustomerData ;
  customerDetails = [];
  lastPurchasedProduct;
  constructor(public store: Store, private router: Router, private dbService: FirestoreService) {

  }

  ngOnInit() {
    this.storeUid$.pipe(first()).subscribe((storeUid) => {
      this.store.dispatch([new GetAllInvoice(storeUid)]);
      this.dbService.getAllCustomers(storeUid).then((data) => {
        data.forEach((doc) => {
          const customer = doc.data();
          customer['number'] = doc.id;
          this.customerDetails.push(customer);
        });
        console.log(this.customerDetails);
      });
    });
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

  selectCustomer(customerNumber: string) {
    this.selectedCustomerInvoiceData = [];
    this.changeCustomer = false;
    this.selectedCustomer = customerNumber;
    this.selectedCustomerValue = customerNumber;
    this.selectedCustomerInvoiceData = this.allInvoices.filter((invoice) => invoice.customerNumber === +customerNumber);
    this.selectedCustomerData = this.customerDetails.filter((customer) => customer.number === customerNumber)[0];
    this.lastPurchasedProduct = this.selectedCustomerInvoiceData[0].cartProducts.map((product) => product.productName + '-' + product.size)[0] ;
  }

  toggleCustomer() {
    this.changeCustomer = true;
  }


  navigateToSell() {
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    return this.store.dispatch([new Navigate([`u/${id}/sell`])]);
  }
}
