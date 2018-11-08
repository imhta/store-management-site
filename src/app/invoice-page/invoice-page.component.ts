import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetAllInvoice} from '../shared/actions/invoice.actions';
import {StoreState} from '../shared/state/store.state';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../shared/models/invoice.model';
import {UserStoreState} from '../shared/models/store.model';
import {Navigate} from '@ngxs/router-plugin';
import {GetAllReturns} from '../shared/actions/return.actions';
import {ReturnModel} from '../shared/models/return.model';
import {LoadingTrue} from '../shared/state/loading.state';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css']
})
export class InvoicePageComponent implements OnInit {
  @Select(StoreState.uid) storeUid$: Observable<string>;
  @Select('storeState') storeState$: Observable<UserStoreState>;
  @Select('bills') allBills$: Observable<{ invoices: InvoiceModel[], returnBills: [] }>;
  allInvoices: InvoiceModel[] = [];
  allReturns: ReturnModel[] = [];
  printContents;
  currentStore;
  showReturn = false;
  constructor(private store: Store) {
    this.storeUid$
      .subscribe((storeUid) => this.store.dispatch([new LoadingTrue(), new GetAllInvoice(storeUid), new GetAllReturns(storeUid)]));
    this.allBills$.subscribe((allBills) => {
      this.allInvoices = allBills.invoices;
      this.allReturns = allBills.returnBills;
    });
    this.storeState$.subscribe((storeState) => this.currentStore = storeState.linkedStores[storeState.selectedStore]);
  }

  ngOnInit() {

  }

  print(): void {
    this.printContents = '';
    let popupWin;

    this.printContents = document.getElementById('print-section').innerHTML + this.printContents;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
           @page {
            size: auto;  /* auto is the initial value */
            margin: 0mm; /* this affects the margin in the printer settings */
          }
          html {
            background-color: #FFFFFF;
            margin: 0px; /* this affects the margin on the HTML before sending to printer */
            padding: 0px;
          }
          .container{
          max-width: 300px;
          text-align: center;
          }
          p{
          text-align: right;
          }
          table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
            tr:nth-child(even) {
                background-color: #dddddd;
            }
          </style>
        </head>
    <body onload="window.print();window.close()">
    <div class="container" >

     ${this.printContents}
    </div>
    </body>
      </html>`
    );
    popupWin.document.close();
  }

  navigateToSell() {
    this.store.dispatch([new Navigate(['sales'])]);
  }
}
