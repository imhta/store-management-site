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
export class  DeleteAProduct {
  static readonly type = '[Product] Delete product';
  constructor(public  storeId: string, public productUid: string) {}
}
export class  ProductDeletedSuccessfully {
  static readonly type = '[Product] product deleted successfully';
}
export class  ErrorInDeletingProduct {
  static readonly type = '[Product] Error: While deleting product';
  constructor(public err: string) {}
}
export class  SearchForProduct {
  static readonly type = '[Product] Search for product';
  constructor(public  storeId: string, public keyword: string, public searchOption: string) {}
}
export class ProductFounded {
  static readonly type = '[Product] Product founded';
  constructor(public resultProducts: any[]) {}
}

export class  ErrorInProductSearch {
  static readonly type = '[Product] Error: error in Product search';
  constructor(public  err: string) {}
}
