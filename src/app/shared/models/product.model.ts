export class  SingleProductModel {
  productUid: string;
  productName: string;
  productType: string;
  description: string;
  stock: number;
  price: number;
  tags: string[];
  addedBy: string;
  storeId: string;
  createdOn: Date = new Date();

  constructor(data) {
    this.productName = data.productName;
    this.productType = data.type;
    this.description = data.description;
    this.stock = data.stock;
    this.price = data.price;
    this.tags = data.tags;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
  }

  toJson() {
    return {
      'productName': this.productName,
      'description': this.description,
      'productType': this.productType,
      'stock': this.stock,
      'price': this.price,
      'tags': this.tags,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'createdOn': this.createdOn,
      'isUnlistable': true
    };
  }
}
