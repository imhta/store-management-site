import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export class InvoiceModel {
  invoiceId: string;
  customerNumber: string;
  cartProducts: object[] = [];
  typeOfPayment: 'Card' | 'Cash' | 'Cash & Card';
  totalPrice: number;
  totalQuantity: number;
  gstNumber: string;
  hasNoGstNumber: boolean;
  totalTax: number;
  storeUid: string;
  createdOn: Timestamp;
  billedBy: string;

  constructor() {
    this.customerNumber = '';
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.totalTax = 0;
  }

  fromJson(data) {
    this.customerNumber = data.customerNumber;
    this.cartProducts = data.cartProducts;
    this.typeOfPayment = data.typeOfPayment;
    this.billedBy = data.billedBy;
    this.totalPrice = data.totalPrice;
    this.totalQuantity = data.totalQuantity;
    this.createdOn = data.createdOn;
    this.totalTax = data.totalTax;
    this.invoiceId = data.invoiceId;
    this.storeUid = data.storeUid;
    this.hasNoGstNumber = data.hasNoGstNumber;
  }

  cartProductsToJson(arrayOfProducts: CartProduct[]) {
    this.cartProducts = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.totalTax = 0;
    arrayOfProducts.forEach((product) => {
      this.totalQuantity = this.totalQuantity + product.totalQuantity;
      this.totalPrice = this.totalPrice + product.totalPrice;
      this.totalTax = this.totalTax + product.totalTax;
      this.cartProducts.push(product.toJson());
    });
  }

  toJson() {
    return {
      'customerNumber': this.customerNumber,
      'cartProducts': this.cartProducts,
      'typeOfPayment': this.typeOfPayment,
      'billedBy': this.billedBy,
      'gstNumber': this.gstNumber,
      'hasNoGstNumber': this.hasNoGstNumber,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'totalTax': this.totalTax,
      'storeUid': this.storeUid,
      'createdOn': Timestamp.now(),
      'invoiceId': this.invoiceId ? this.invoiceId : '',
      'pending': true
    };
  }

}

export class CartProduct {
  prn: string;
  productUid: string;
  productName: string;
  brandName: string;
  categories: { category1: string, category2: string, colorCategory: string };
  material: string;
  size: string;
  isVariantsWithSamePrice: boolean;
  singleUnitPrice: number;
  totalQuantity: number;
  maxQuantity: number;
  totalPrice: number;
  hsnCode: string;
  taxInPercentage: number;
  totalTax: number;
  variants: { size: string, stock: number, purchasedPrice: number, sellingPrice: number }[];
  selectedSize: number;
  inclusiveAllTaxes: boolean;
  addedBy: string;
  isOutStock = false;

  constructor() {
    this.maxQuantity = 0;
  }

  fromJson(data) {
    this.prn = data.prn;
    this.productUid = data.productUid;
    this.productName = data.productName;
    this.categories = data.categories;
    this.brandName = data.brandName;
    this.size = data.size ? data.size : '';
    this.singleUnitPrice = data.singleUnitPrice;
    this.totalQuantity = data.totalQuantity;
    this.maxQuantity = data.maxQuantity;
    this.totalPrice = data.totalPrice;
    this.totalTax = data.totalTax;
    this.taxInPercentage = data.taxInPercentage;
    this.inclusiveAllTaxes = data.inclusiveAllTaxes;
  }

  calculateProductTotal() {
    this.isOutStock = this.totalQuantity > this.maxQuantity;
    if (this.inclusiveAllTaxes) {
      this.totalPrice = this.singleUnitPrice * this.totalQuantity;
      this.totalTax = +((this.totalPrice - (this.totalPrice / (1 + (this.taxInPercentage / 100)))).toFixed(2));
    } else {
      this.totalPrice = this.singleUnitPrice * this.totalQuantity;
      this.totalTax = Math.round((this.totalPrice * (this.taxInPercentage / 100)));
      this.totalPrice = this.totalPrice + this.totalTax;
    }

  }

  toJson() {
    return {
      'prn': this.prn,
      'productUid': this.productUid,
      'productName': this.productName,
      'brandName': this.brandName,
      'size': this.size ? this.size : '',
      'singleUnitPrice': this.singleUnitPrice,
      'hsnCode': this.hsnCode,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'maxQuantity': this.maxQuantity,
      'totalTax': this.totalTax,
      'categories': this.categories,
      'taxInPercentage': this.taxInPercentage,
      'inclusiveAllTaxes': this.inclusiveAllTaxes ? this.inclusiveAllTaxes : null,
      'addedBy': this.addedBy ? this.addedBy : ''
    };
  }

}

