import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetAllInvoice} from '../shared/actions/invoice.actions';
import {StoreState} from '../shared/state/store.state';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../shared/models/invoice.model';
import {UserStoreState} from '../shared/models/store.model';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css']
})
export class InvoicePageComponent implements OnInit {
  @Select(StoreState.uid) storeUid$: Observable<string>;
  @Select('storeState') storeState$: Observable<UserStoreState>;
  @Select('invoices') allInvoice$: Observable<InvoiceModel[]>;
  allInvoices: InvoiceModel[] = [];
  printContents;
  currentStore;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.storeUid$.subscribe((storeUid) => this.store.dispatch([new GetAllInvoice(storeUid)]));
    this.allInvoice$.subscribe((allInvoices) => this.allInvoices = allInvoices);
    this.storeState$.subscribe((storeState) => this.currentStore = storeState.linkedStores[storeState.selectedStore]);
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

}
