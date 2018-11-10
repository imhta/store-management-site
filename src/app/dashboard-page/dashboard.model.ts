import {InvoiceModel} from '../shared/models/invoice.model';
import * as moment from 'moment';

export class DashboardModel {
  // invoice
  totalInvoice: number;
  totalProductsSold: number;
  totalMoneyOfAllInvoiceWithoutDiscounts: number;
  totalOfAllDiscounts: number;
  totalOfAllTaxes: number;
  totalSalesByCountInDates: number[];
  totalSalesByMoneyInDates: number[];
  totalSalesByTaxesInDates: number[];
  totalSalesByDiscountsInDates: number[];

  // products
  totalNumberOfProductsInStock: number;
  totalNumberOfProductsInDifferentSizes: number;
  constructor() {
    this.totalInvoice = 0;
    this.totalProductsSold = 0;
    this.totalMoneyOfAllInvoiceWithoutDiscounts = 0;
    this.totalNumberOfProductsInStock = 0;
    this.totalNumberOfProductsInDifferentSizes = 0;
    this.totalOfAllDiscounts = 0;
    this.totalOfAllTaxes = 0;
    this.totalSalesByCountInDates = [];
    this.totalSalesByMoneyInDates = [];
    this.totalSalesByTaxesInDates = [];
    this.totalSalesByDiscountsInDates = [];
  }

  salesFilter(numberOfDays: number, invoices: InvoiceModel[]) {
    this.totalSalesByCountInDates = [];
    this.totalSalesByMoneyInDates = [];
    this.totalSalesByTaxesInDates = [];
    this.totalSalesByDiscountsInDates = [];
    for (let i = 0; i < numberOfDays; i++) {
      const filtered = invoices
        .filter((invoice) =>
          moment(invoice.createdOn.toDate()).format('LL') === moment(moment().subtract(i, 'days')).format('LL'));

      this.totalSalesByCountInDates
        .push(
          filtered.map((invoice) => invoice.totalQuantity)
            .reduce((sum, value) => {
              return sum + value;
            }, 0)
        );
      this.totalSalesByMoneyInDates
        .push(
          filtered.map((invoice) => invoice.totalPrice)
            .reduce((sum, value) => {
              return sum + value;
            }, 0)
        );
      this.totalSalesByTaxesInDates
        .push(
          filtered.map((invoice) => invoice.totalTax)
            .reduce((sum, value) => {
              return sum + value;
            }, 0)
        );
      this.totalSalesByDiscountsInDates
        .push(
          filtered.map((invoice) => invoice.discountPrice)
            .reduce((sum, value) => {
              return sum + value;
            }, 0)
        );
    }

  }

  getLabelDates(numberOfDays: number) {
    const labelDates = [];
    for (let i = 0; i < numberOfDays; i++) {
      labelDates.push(moment(moment().subtract(i, 'days')).format('dddd'));
    }
    return labelDates;
  }
}
