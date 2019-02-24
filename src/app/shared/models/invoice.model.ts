import {ReturnModel} from './return.model';
import {firestore} from 'firebase/app';


export class BillsModel {
  invoices: InvoiceModel[];
  returnBills: ReturnModel[];
}

export class InvoiceModel {
  invoiceId: string;
  customerNumber: string;
  customerName: string;
  cartProducts: object[] = [];
  typeOfPayment: 'Card' | 'Cash' | 'Cash & Card';
  isDiscountApplied = false;
  discount: object = {};
  discountPrice = 0;
  totalPrice: number;
  totalQuantity: number;
  gstNumber: string;
  hasNoGstNumber: boolean;
  totalTax: number;
  storeUid: string;
  sendSms: boolean;
  storeDetails: {
    storeName: string,
    mobileNumber: string,
    address: object,
    location: firestore.GeoPoint,
    gstNumber: string,
    storeLogo: string
  };
  createdOn: firestore.Timestamp;
  billedBy: string;

  constructor() {
    this.customerName = '';
    this.customerNumber = '';
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.totalTax = 0;
    this.sendSms = true;
    this.createdOn = firestore.Timestamp.now();
  }

  fromJson(data) {
    this.customerNumber = data.customerNumber;
    this.customerName = data.customerName;
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
    this.discount = data.discount;
    this.isDiscountApplied = data.isDiscountApplied;
    this.discountPrice = data.discountPrice;
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
      'customerName': this.customerName,
      'cartProducts': this.cartProducts,
      'discount': this.discount,
      'isDiscountApplied': this.isDiscountApplied,
      'typeOfPayment': this.typeOfPayment,
      'billedBy': this.billedBy,
      'gstNumber': this.gstNumber,
      'hasNoGstNumber': this.hasNoGstNumber,
      'discountPrice': this.discountPrice,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'totalTax': this.totalTax,
      'storeUid': this.storeUid,
      'sendSms': this.sendSms,
      'storeDetails': this.storeDetails,
      'createdOn': this.createdOn,
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
  categories: string[];
  singleUnitPrice: number;
  totalQuantity: number;
  maxQuantity: number;
  totalPrice: number;
  taxInPercentage: number;
  totalTax: number;
  attributeTemplate: string;
  attributeValues: string[];
  unit: string;
  purchasedPrice: number;
  sellingPrice: number;
  inclusiveOfAllTaxes: boolean;
  addedBy: string;
  isOutStock = false;
  pictures: { url: []; path: [] } | string;

  constructor() {
    this.maxQuantity = 0;
  }

  fromJson(data) {
    this.prn = data.prn;
    this.productUid = data.productUid;
    this.productName = data.productName;
    this.categories = data.categories;
    this.brandName = data.brandName;
    this.singleUnitPrice = data.singleUnitPrice;
    this.unit = data.unit;
    this.purchasedPrice = data.purchasedPrice;
    this.sellingPrice = data.sellingPrice;
    this.pictures = data.isListable ? data.pictures : {url: [], path: []};
    this.attributeValues = data.attributeValues;
    this.attributeTemplate = data.attributeTemplate;
    this.totalQuantity = data.totalQuantity;
    this.maxQuantity = data.maxQuantity;
    this.totalPrice = data.totalPrice;
    this.totalTax = data.totalTax;
    this.taxInPercentage = data.taxInPercentage;
    this.inclusiveOfAllTaxes = data.inclusiveOfAllTaxes;
    this.addedBy = data.addedBy;
    this.isOutStock = data.isOutStock;
  }
  fromProductData(data) {
    this.prn = data.prn;
    this.productUid = data.productUid;
    this.productName = data.productName;
    this.categories = data.categories;
    this.brandName = data.brandName;
    this.unit = data.unit;
    this.singleUnitPrice = data.sellingPrice;
    this.purchasedPrice = data.purchasedPrice;
    this.sellingPrice = data.sellingPrice;
    this.pictures = data.isListable ? data.pictures : {url: [], path: []};
    this.attributeValues = data.attributeValues;
    this.attributeTemplate = data.attributeTemplate;
    this.totalQuantity = 1;
    this.maxQuantity = data.stock;
    this.totalPrice = data.sellingPrice * this.totalQuantity;
    this.taxInPercentage = data.taxInPercentage;
    this.totalTax = (this.taxInPercentage / 100) * data.totalPrice;
    this.inclusiveOfAllTaxes = data.inclusiveOfAllTaxes;
  }
  calculateProductTotal() {
    this.isOutStock = this.totalQuantity > this.maxQuantity;
    if (this.inclusiveOfAllTaxes) {
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
      'attributeTemplate': this.attributeTemplate,
      'singleUnitPrice': this.singleUnitPrice,
      'attributeValues': this.attributeValues,
      'unit': this.unit,
      'purchasedPrice': this.purchasedPrice,
      'sellingPrice': this.sellingPrice,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'maxQuantity': this.maxQuantity,
      'totalTax': this.totalTax,
      'categories': this.categories,
      'taxInPercentage': this.taxInPercentage,
      'inclusiveAllTaxes': this.inclusiveOfAllTaxes ? this.inclusiveOfAllTaxes : null,
      'addedBy': this.addedBy ? this.addedBy : '',
      'pictures': this.pictures
    };
  }

}

