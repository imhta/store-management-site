import {firestore} from 'firebase/app';



export class SingleProductModel {
  productUid: string;
  productName: string;
  prn: string;
  groupId: string;
  brandName: string;
  categories: string[];
  description: string;
  picturesUrl: string[] = [];
  picturesPath: string[] = [];
  isDeleted: boolean;
  isVariantsWithSamePrice: boolean;
  hasNoGstNumber: boolean;
  typeOfProduct: string;
  supplierName: string;
  supplierCode: string;
  trackProductInventory: boolean;
  stock: number;
  unit: string;
  reOrderPoint: number;
  taxInPercentage: number;
  taxName: string;
  inclusiveAllTaxes: boolean;
  purchasedPrice: number;
  sellingPrice: number;
  marginInPercentage: number;
  attributes: string[];
  addedBy: string;
  storeId: string;
  tags: string[];
  storeDetails: { address: { city: string, pinCode: number, state: string, street: string }, location: firestore.GeoPoint, name: string };
  createdOn: firestore.Timestamp;
  isListable: boolean;
  lastModified: firestore.Timestamp;

  constructor() {
    this.isListable = false;
    this.trackProductInventory = false;
  }

  fromFromData(data) {
    this.typeOfProduct = data.typeOfProduct;
    this.brandName = data.brandName;
    this.productName = data.productName;
    this.categories = data.categories;
    this.description = data.description;
    this.supplierName = data.supplierName;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
    this.tags = data.tags;
    this.supplierCode = data.supplierCode;
    this.trackProductInventory = data.trackProductInventory;
    this.unit = data.unit;
    this.inclusiveAllTaxes = data.inclusiveAllTaxes;
    this.isVariantsWithSamePrice = data.isVariantsWithSamePrice;
    this.hasNoGstNumber = data.hasNoGstNumber;
    this.stock = +data.stock;
    this.reOrderPoint = +data.reOrderPoint;
    this.taxInPercentage = +data.taxInPercentage;
    this.taxName = data.taxName;
    this.purchasedPrice = +data.purchasedPrice;
    this.sellingPrice = +data.sellingPrice;
    this.marginInPercentage = +data.marginInPercentage;
    this.attributes = data.attributes;

  }

  fromStoreDate(storeDetails) {
    this.storeDetails = storeDetails;
  }

  toJson() {
    return {
      'brandName': this.brandName,
      'productName': this.productName,
      'prn': this.prn,
      'groupId' : this.groupId,
      'description': this.description,
      'categories': this.categories,
      'typeOfProduct' : this.typeOfProduct,
      'isVariantsWithSamePrice': this.isVariantsWithSamePrice,
      'supplierName': this.supplierName,
      'supplierCode' : this.supplierCode,
      'picturesPath': this.picturesPath,
      'picturesUrl': this.picturesUrl,
      'tags': this.tags,
      'hasNoGstNumber': this.hasNoGstNumber,
      'trackProductInventory': this.trackProductInventory,
      'stock' : this.stock,
      'unit' : this.unit,
      'reOrderPoint' : this.reOrderPoint,
      'taxInPercentage' : this.taxInPercentage,
      'taxName' : this.taxName,
      'purchasedPrice': this.purchasedPrice,
      'sellingPrice': this.sellingPrice,
      'marginInPercentage' : this.marginInPercentage,
      'attributes': this.attributes,
      'inclusiveAllTaxes': this.inclusiveAllTaxes,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'storeDetails': this.storeDetails,
      'createdOn': firestore.Timestamp.now(),
      'isListable': this.isListable,
      'isDeleted': false
    };
  }
}
