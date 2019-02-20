import {firestore} from 'firebase/app';



export class SingleProductModel {
  productUid: string;
  productName: string;
  prn: string;
  groupId: string;
  brandName: string;
  categories: string[];
  description: string;
  pictures: {url: [], path: []};
  isDeleted: boolean;
  isVariantsWithSamePriceAndTax: boolean;
  hasNoGstNumber: boolean;
  typeOfProduct: string;
  supplier: string;
  supplierCode: string;
  trackThisProduct: boolean;
  stock: number;
  unit: string;
  reorderPoint: number;
  taxInPercentage: number;
  taxName: string;
  inclusiveOfAllTaxes: boolean;
  purchasedPrice: number;
  sellingPrice: number;
  marginInPercentage: number;
  attributeTemplate: string[];
  attributeValues: string[];
  addedBy: string;
  storeId: string;
  tags: string[];
  storeDetails: { address: { city: string, pinCode: number, state: string, street: string }, location: firestore.GeoPoint, name: string };
  createdOn: firestore.Timestamp;
  isListable: boolean;
  lastModified: firestore.Timestamp;

  constructor() {
    this.isListable = false;
    this.trackThisProduct = false;
  }

  fromFromData(data) {
    this.typeOfProduct = data.typeOfProduct;
    this.prn = data.prn;
    this.groupId = data.groupId;
    this.brandName = data.brandName;
    this.productName = data.productName;
    this.categories = data.categories;
    this.description = data.description;
    this.tags = data.tags;
    this.supplier = data.supplier;
    this.attributeValues = data.attributeValues;
    this.attributeTemplate = data.attributeTemplate;
    this.unit = data.unit;
    this.pictures = data.pictures;
    this.supplierCode = data.supplierCode;
    this.trackThisProduct = data.trackThisProduct;
    this.storeDetails = data.storeDetails;
    this.inclusiveOfAllTaxes = data.inclusiveOfAllTaxes;
    this.isListable = data.isListable;
    this.isVariantsWithSamePriceAndTax = data.isVariantsWithSamePriceAndTax;
    this.hasNoGstNumber = data.hasNoGstNumber;
    this.stock = +data.stock;
    this.reorderPoint = +data.reorderPoint;
    this.taxInPercentage = +data.taxInPercentage;
    this.taxName = data.taxName;
    this.purchasedPrice = +data.purchasedPrice;
    this.sellingPrice = +data.sellingPrice;
    this.marginInPercentage = +data.marginInPercentage;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
  }


  toJson() {
    return {
      'brandName': this.brandName,
      'productName': this.productName,
      'prn': this.prn,
      'groupId' : this.groupId,
      'description': this.description,
      'categories': this.categories,
      'isVariantsWithSamePriceAndTax': this.isVariantsWithSamePriceAndTax,
      'supplier': this.supplier,
      'supplierCode' : this.supplierCode,
      'pictures': this.pictures,
      'tags': this.tags,
      'hasNoGstNumber': this.hasNoGstNumber,
      'trackThisProduct': this.trackThisProduct,
      'stock' : this.stock,
      'unit' : this.unit,
      'reorderPoint' : this.reorderPoint,
      'taxInPercentage' : this.taxInPercentage,
      'taxName' : this.taxName,
      'purchasedPrice': this.purchasedPrice,
      'sellingPrice': this.sellingPrice,
      'marginInPercentage' : this.marginInPercentage,
      'attributeValues': this.attributeValues,
      'attributeTemplate': this.attributeTemplate,
      'inclusiveOfAllTaxes': this.inclusiveOfAllTaxes,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'storeDetails': this.storeDetails,
      'createdOn': firestore.Timestamp.now(),
      'isListable': this.isListable,
      'isDeleted': false
    };
  }
}
