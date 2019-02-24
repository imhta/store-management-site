import {InvoiceModel} from '../models/invoice.model';

export class SaveInvoice {
  static readonly type = '[Invoice] Save invoice';
  constructor(public invoice: InvoiceModel) {}
}
export class InvoiceSavedSuccessfully {
  static readonly type = '[Invoice] Invoice saved successfully ';
}
export class ErrorInSavingInvoice {
  static readonly type = '[Invoice] Error in saving invoice ';
  constructor(public err: string) {}
}
export class GetAllInvoice {
  static readonly type = '[Invoice] Get all Invoice';
  constructor(public storeUid: string) {}
}
export class GotAllInvoiceSuccessfully {
  static readonly type = '[Invoice] Got all invoice successfully';
  constructor(public allInvoices: InvoiceModel[]) {}
}
export class ErrorInGettingAllInvoice {
  static readonly type = '[Invoice] Error in getting all invoice ';
  constructor(public err: string) {}
}
export class ReduceStock {
  static readonly type = '[Invoice] Reduce Stock';
  constructor(public invoice: InvoiceModel) {}
}
export class ReducedStockSuccessfully {
  static readonly type = '[Invoice] Reduced Stock successfully';
}
