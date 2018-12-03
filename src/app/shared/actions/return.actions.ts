import {InvoiceModel} from '../models/invoice.model';
import {ReturnModel} from '../models/return.model';

export class GetInvoice {
  static readonly type = '[Return] Getting invoice';

  constructor(public invoiceId: string) {
  }
}

export class GotInvoiceSuccessfully {
  static readonly type = '[Return] Got Invoice successfully ';

  constructor(public invoice: InvoiceModel) {
  }
}

export class ErrorInGettingInvoice {
  static readonly type = '[Return] Error in getting invoice ';

  constructor(public err: string) {
  }
}

export class InvoiceNotFound {
  static readonly type = '[Return] Invoice not found ';
}

export class ReturnInvoice {
  static readonly type = '[Return] Return Invoice';

  constructor(public returnInvoice: ReturnModel) {
  }
}

export class ReturnedInvoiceSuccessfully {
  static readonly type = '[Return] Returned invoice successfully';
}

export class ErrorInReturningInvoice {
  static readonly type = '[Return] Error in Returning  invoice ';

  constructor(public err: string) {
  }
}

export class GetAllReturns {
  static readonly type = '[Return] Get all returns';

  constructor(public storeUid: string) {
  }
}

export class GotAllReturnsSuccessfully {
  static readonly type = '[Return] Got all returns successfully';

  constructor(public allReturns: ReturnModel[]) {
  }
}

export class ErrorInGettingAllReturns {
  static readonly type = '[Return] Error in getting all returns ';

  constructor(public err: string) {
  }
}
