import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {BillsModel} from '../shared/models/invoice.model';
import {Chart} from 'chart.js';
import {StoreState} from '../shared/state/store.state';

import {DashboardModel} from './dashboard.model';
import {SingleProductModel} from '../shared/models/product.model';

import {Navigate} from '@ngxs/router-plugin';

import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  @Select(StoreState.uid) storeUid$: Observable<string>;
  @Select('bills') bills$: Observable<BillsModel>;
  @Select('allProducts') allProducts$: Observable<SingleProductModel[]>;
  earningsInWeek;
  salesPie;
  today = new Date();
  dashboard = new DashboardModel();

  constructor(private store: Store, private router: Router) {

  }

  ngOnInit() {
    this.bills$
      .subscribe(bills => {
        this.dashboard.totalInvoice = 0;
        this.dashboard.totalProductsSold = 0;
        this.dashboard.totalMoneyOfAllInvoiceWithoutDiscounts = 0;
        this.dashboard.totalOfAllDiscounts = 0;
        this.dashboard.totalOfAllTaxes = 0;
        this.dashboard.totalInvoice = bills.invoices.length;
        bills.invoices.forEach((invoice) => {
          this.dashboard.totalProductsSold = this.dashboard.totalProductsSold + invoice.totalQuantity;
          this.dashboard.totalMoneyOfAllInvoiceWithoutDiscounts = invoice.hasNoGstNumber
            ? this.dashboard.totalMoneyOfAllInvoiceWithoutDiscounts + invoice.totalPrice - invoice.discountPrice
            : this.dashboard.totalMoneyOfAllInvoiceWithoutDiscounts + (invoice.totalPrice - invoice.totalTax);
          this.dashboard.totalOfAllTaxes = invoice.hasNoGstNumber ? 0 : this.dashboard.totalOfAllTaxes + invoice.totalTax;
          this.dashboard.totalOfAllDiscounts = this.dashboard.totalOfAllDiscounts + invoice.discountPrice;
        });
        this.dashboard.salesFilter(7, bills.invoices);
        this.refreshCharts();
      });

    // this.allProducts$.subscribe((products) => {
    //   this.dashboard.totalNumberOfProductsInStock = 0;
    //   this.dashboard.totalNumberOfProductsInDifferentSizes = 0;
    //   products.forEach((product) => {
    //     this.dashboard.totalNumberOfProductsInDifferentSizes =
    //       this.dashboard.totalNumberOfProductsInDifferentSizes + product.variants.length;
    //     this.dashboard.totalNumberOfProductsInStock =
    //       this.dashboard.totalNumberOfProductsInStock + product.variants
    //         .map((variant) => variant.stock)
    //         .reduce((sum, value) => {
    //           return sum + value;
    //         }, 0);
    //   });
    //   console.log(this.dashboard.totalNumberOfProductsInDifferentSizes, this.dashboard.totalNumberOfProductsInStock );
    // });

  }

  navigateToAddProduct(path: string) {
    const id = +this.router.routerState.snapshot.url.split('/')[3];
    return this.store.dispatch([new Navigate([`go/u/${id}/${path}`])]);
  }

  refresh() {
    this.today = new Date();
  }

  refreshCharts() {
    // @ts-ignore
    this.earningsInWeek = new Chart(earningsInWeek, {
      type: 'bar',
      data: {
        labels: this.dashboard.getLabelDates(this.dashboard.totalSalesByMoneyInDates.length).reverse(),
        datasets: [{
          data: this.dashboard.totalSalesByMoneyInDates.reverse(),
          label: 'Earned in week',
          backgroundColor: '#4bc0c0',
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    });
    // @ts-ignore
    this.salesPie = new Chart(salesPie, {
      type: 'doughnut',
      data: {
        labels: ['Earned Money', 'Total Collected Taxes', 'Total Discount Provided'],
        datasets: [{
          data: [
            this.dashboard.totalMoneyOfAllInvoiceWithoutDiscounts.toFixed(2),
            this.dashboard.totalOfAllTaxes.toFixed(2),
            this.dashboard.totalOfAllDiscounts.toFixed(2)
          ],
          backgroundColor: [
            '#4bc0c0',
            '#ff6384',
            '#36a2eb',
            '#ff9f40',
            '#ffcd56',
          ],
        }]
      },
      options: {
        responsive: true
      }
    });

  }
}
