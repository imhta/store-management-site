export class OnlineProductTagModel {
  productUid: string;
  onlineProductLink: string;
  typeOfLink: string[];
  createdOn: Date;

  fromData({productUid, onlineProductLink, typeOfLink}) {
    this.productUid = productUid;
    this.typeOfLink = typeOfLink;
    this.onlineProductLink = onlineProductLink;
  }

  toJson() {
    return {
      'productUid': this.productUid,
      'typeOfLink': this.typeOfLink,
      'onlineProductLink': this.onlineProductLink,
      'createdOn': new Date()
    };
  }
}
