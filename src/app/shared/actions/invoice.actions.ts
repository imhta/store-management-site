import {InvoiceModel} from '../models/invoice.model';

export class SaveInvoice {
  static readonly type = '[Invoice] Save invoice';
  constructor(public invoice: InvoiceModel) {}
}
export class InvoiceSavedSuccessfully {
  static readonly type = '[Invoice] Invoice saved successfully ';
}
export class ErrorInSavingInvoice {
  static readonly type = '[Invoice]Error in saving invoice ';
  constructor(public err: string) {}
}
