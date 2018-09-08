import { SingleProductModel} from '../models/product.model';

export class UploadSingleProduct {
  static readonly type = '[Product] Upload single product';
  constructor(public product: SingleProductModel) {}
}
export class SingleProductUploadedSuccessfully {
  static readonly type = '[Product] Single product uploaded successfully';
}
export class SingleProductNotUploaded {
  static readonly type = '[Product] Error: Single product not uploaded';
  constructor(public err: string) {}
}
export  class  GetAllProducts {
  static  readonly  type = '[Product] Get all products';
  constructor(public storeId: string) {}
}
export class GotAllProducts {
  static readonly type = '[Product] Got all products';
  constructor(public allProduct: any[]) {}
}
export  class  GetAllProductsError {
  static  readonly  type = '[Product] Error: Get all products';
  constructor(public err: string) {}
}
