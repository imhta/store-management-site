import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../service/firestore/firestore.service';
import {
  GetAllProducts,
  SingleProductNotUploaded,
  SingleProductUploadedSuccessfully,
  UploadSingleProduct,
  GotAllProducts
} from '../actions/product.actions';
import {LoadingFalse} from './loading.state';
import {Navigate} from '@ngxs/router-plugin';
import {SingleProductModel} from '../models/product.model';


@State<any[]>({
  name: 'allProducts',
  defaults: []
})
export class AllProductState {
  constructor(private dbService: FirestoreService, private  store: Store) {
  }


  @Action(UploadSingleProduct)
  uploadSingleProduct(cxt: StateContext<any>, {product}: UploadSingleProduct) {
    this.dbService.uploadSingleProduct(product).then(() => {
      this.store.dispatch([new SingleProductUploadedSuccessfully()]);
    }).catch((err) => this.store.dispatch([new SingleProductNotUploaded(err)]));
  }

  @Action(SingleProductUploadedSuccessfully)
  uploadSingleProductSuccessfully() {
    this.store.dispatch([new LoadingFalse(), new Navigate(['add/product'])]);
  }

  @Action(GetAllProducts)
  getAllProducts(cxt: StateContext<SingleProductModel[]>, {storeId}: GetAllProducts) {
    this.dbService.getAllProducts(storeId).then().catch();
  }

  @Action(GotAllProducts)
  gotAllProducts(cxt: StateContext<any[]>, {allProduct}: GotAllProducts) {
    cxt.setState(allProduct);
  }

}
