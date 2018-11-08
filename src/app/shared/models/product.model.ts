import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export class SingleProductModel {
  productUid: string;
  productName: string;
  prn: string;
  brandName: string;
  categories: { category1: string, category2: string, colorCategory: string };
  description: string;
  gender: 'Male' | 'Female' | 'Boy' | 'Girl';
  picturesUrl: string[] = [];
  picturesPath: string[] = [];
  isDeleted: boolean;
  isVariantsWithSamePrice: boolean;
  hasNoGstNumber: boolean;
  variants: { size: string, stock: number, purchasedPrice: number, sellingPrice: number }[];
  addedBy: string;
  storeId: string;
  tags: string[];
  taxType: 'footwear' | 'textile' | 'other';
  otherTax: number;
  hsnCode: string;
  inclusiveAllTaxes: boolean;
  createdOn: Timestamp;
  isListable: boolean;
  lastModified: Timestamp;

  constructor() {
    this.isListable = false;
  }

  fromFromData(data) {
    this.gender = data.gender;
    this.brandName = data.brandName;
    this.productName = data.productName;
    this.categories = data.categories;
    this.description = data.description;
    this.variants = data.variants;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
    this.tags = data.tags;
    this.taxType = data.taxType;
    this.hsnCode = data.hsnCode;
    this.otherTax = +data.otherTax;
    this.inclusiveAllTaxes = data.inclusiveAllTaxes;
    this.isVariantsWithSamePrice = data.isVariantsWithSamePrice;
    this.hasNoGstNumber = data.hasNoGstNumber;
  }


  toJson() {
    return {
      'brandName': this.brandName,
      'productName': this.productName,
      'description': this.description,
      'categories': this.categories,
      'gender': this.gender,
      'isVariantsWithSamePrice': this.isVariantsWithSamePrice,
      'variants': this.variants,
      'picturesPath': this.picturesPath,
      'picturesUrl': this.picturesUrl,
      'tags': this.tags,
      'hasNoGstNumber': this.hasNoGstNumber,
      'taxType': this.taxType,
      'otherTax': this.otherTax,
      'hsnCode': this.hsnCode,
      'inclusiveAllTaxes': this.inclusiveAllTaxes,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'createdOn': Timestamp.now(),
      'isListable': this.isListable,
      'isDeleted': false
    };
  }
}
