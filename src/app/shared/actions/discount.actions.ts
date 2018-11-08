import {DiscountModel} from '../models/discount.model';

export class UploadDiscount {
  static readonly type = '[Discount] Upload discount';

  constructor(public discount: DiscountModel) {
  }
}

export class DiscountUploadedSuccessfully {
  static readonly type = '[Discount] Discount uploaded successfully';
}

export class DiscountNotUploaded {
  static readonly type = '[Discount] Error: Discount not uploaded';

  constructor(public err: string) {
  }
}

export class GetAllDiscounts {
  static readonly type = '[Discount] Get all discounts';

  constructor(public storeId: string) {
  }
}

export class GotAllDiscountsSuccessfully {
  static readonly type = '[Discount] Got all discounts';

  constructor(public allDiscount: any[]) {
  }
}

export class GetAllDiscountsError {
  static readonly type = '[Discount] Error: Get all discounts';

  constructor(public err: string) {
  }
}

export class DeleteADiscount {
  static readonly type = '[Discount] Delete discount';

  constructor(public discountUid: string) {
  }
}

export class DiscountDeletedSuccessfully {
  static readonly type = '[Discount] Discount deleted successfully';
}

export class ErrorInDeletingDiscount {
  static readonly type = '[Discount] Error: While deleting discount';

  constructor(public err: string) {
  }
}
