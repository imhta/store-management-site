export class SingleProductModel {
  productUid: string;
  productName: string;
  brandName: string;
  category: string;
  description: string;
  gender: 'Male' | 'Female' | 'Boy' | 'Girl';
  picturesUrls: string[] = [];
  picturesPaths: string[] = [];
  isDeleted: boolean;
  ssp: { size: string, stock: number, price: number }[];
  addedBy: string;
  storeId: string;
  tags: string[];
  taxType: 'footwear' | 'textile' | 'other';
  otherTax: number;
  inclusiveAllTaxes: boolean;
  createdOn: Date;
  isListable: boolean;
  lastModified: Date;

  constructor() {
    this.isListable = false;
  }

  fromFromData(data) {
    this.gender = data.gender;
    this.brandName = data.brandName;
    this.productName = data.productName;
    this.category = data.category;
    this.description = data.description;
    this.ssp = data.ssp;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
    this.tags = data.tags;
    this.taxType = data.taxType;
    this.otherTax = +data.otherTax;
    this.inclusiveAllTaxes = data.inclusiveAllTaxes;
  }


  toJson() {
    return {
      'brandName': this.brandName,
      'productName': this.productName,
      'description': this.description,
      'category': this.category,
      'gender': this.gender,
      'ssp': this.ssp,
      'picturesPath': this.picturesPaths,
      'picturesUrl': this.picturesUrls,
      'tags': this.tags,
      'taxType': this.taxType,
      'otherTax': this.otherTax,
      'inclusiveAllTaxes': this.inclusiveAllTaxes,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'createdOn': Date.now(),
      'isListable': this.isListable,
      'isDeleted': false
    };
  }
}
