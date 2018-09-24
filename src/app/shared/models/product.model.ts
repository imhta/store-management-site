export class SingleProductModel {
  productUid: string;
  productName: string;
  category: string;
  description: string;
  gender: 'Male' | 'Female' | 'Boy' | 'Girl';
  picturesUrls: string[] = [];
  picturesPaths: string[] = [];
  isDeleted: boolean;
  ssp: { size: string, stock: number, price: number }[];
  addedBy: string;
  storeId: string;
  createdOn: Date;
  isListable: boolean;
  lastModified: Date;

  constructor() {
    this.isListable = false;
  }

  fromFromData(data) {
    this.gender = data.gender;
    this.productName = data.productName;
    this.category = data.category;
    this.description = data.description;
    this.ssp = data.ssp;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
  }


  toJson() {
    return {
      'productName': this.productName,
      'description': this.description,
      'category': this.category,
      'gender': this.gender,
      'ssp': this.ssp,
      'picturesPath': this.picturesPaths,
      'picturesUrl': this.picturesUrls,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'createdOn': Date.now(),
      'isListable': this.isListable,
      'isDeleted': false
    };
  }
}
