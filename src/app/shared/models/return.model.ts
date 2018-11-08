export class ReturnModel {
  customerNumber: string;
  invoiceId: string;
  storeUid: string;
  cartProducts: object[] = [];
  isAllReturn: boolean;
  returnApprovedBy: string;

  constructor(data) {
    this.customerNumber = data['customerNumber'];
    this.invoiceId = data['invoiceId'];
    this.storeUid = data['storeUid'];
    this.cartProducts = data['cartProducts'];
    this.isAllReturn = data['isAllReturn'];
    this.returnApprovedBy = data['returnApprovedBy'];
  }

  toJson() {
    return {
      'invoiceId': this.invoiceId,
      'storeUid': this.storeUid,
      'customerNumber': this.customerNumber,
      'cartProducts': this.cartProducts,
      'isAllReturn': this.isAllReturn,
      'returnApprovedBy': this.returnApprovedBy
    };
  }
}

