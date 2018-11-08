export class DiscountModel {
  discountUid: string;
  storeUid: string;
  discountName: string;
  discountConditionalNote: string;
  amount: string;
  amountType: string;
  discountType: string;
  appliedFor: string[];

  constructor(data) {
    this.storeUid = data['storeUid'];
    this.discountConditionalNote = data['discountConditionalNote'];
    this.discountName = data['discountName'];
    this.amount = data['amount'];
    this.amountType = data['amountType'];
    this.discountType = data['discountType'];
    this.appliedFor = data['appliedFor'];
  }

  toJson() {
    return {
      'storeUid': this.storeUid,
      'discountName': this.discountName,
      'discountConditionalNote': this.discountConditionalNote,
      'amount': this.amount,
      'amountType': this.amountType,
      'discountType': this.discountType,
      'appliedFor': this.appliedFor
    };
  }
}
