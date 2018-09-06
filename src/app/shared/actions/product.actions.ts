import {SingleProductModel} from '../models/product.model';

export class UploadSingleProduct {
  static readonly type = '[Product] Upload single product';
  constructor(public product: SingleProductModel) {}
}
export class SingleProductUploadedsuccessfully {
  static readonly type = '[Product] Single product uploaded successfully';
}
export class SingleProductNotUploaded {
  static readonly type = '[Product] Error: Single product not uploaded';
  constructor(public err: string) {}
}
