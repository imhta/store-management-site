import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../service/firestore/firestore.service';
import {SingleProductNotUploaded, SingleProductUploadedsuccessfully, UploadSingleProduct} from '../actions/product.actions';
import {LoadingFalse} from './loading.state';
import {Navigate} from '@ngxs/router-plugin';


@State({
  name: 'allProduct',
  defaults: null
})
export class AllProductState {
  constructor(private dbService: FirestoreService, private  store: Store) {
  }


  @Action(UploadSingleProduct)
  uploadSingleProduct(cxt: StateContext<any>, {product}: UploadSingleProduct) {
    this.dbService.uploadSingleProduct(product).then(() => {
      this.store.dispatch([new SingleProductUploadedsuccessfully()]);
    }).catch((err) => this.store.dispatch([new SingleProductNotUploaded(err)]));
  }
  @Action(SingleProductUploadedsuccessfully)
  uploadSingleProductSuccessfully() {
    this.store.dispatch([new LoadingFalse(), new Navigate(['add/product'])]);
  }
}
