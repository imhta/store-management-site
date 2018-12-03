import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../service/firestore/firestore.service';
import {
  DeleteAProduct,
  ErrorInDeletingProduct,
  GetAllProducts,
  GotAllProducts,
  ProductDeletedSuccessfully,
  SearchForProduct,
  SingleProductNotUploaded,
  SingleProductUploadedSuccessfully,
  UploadSingleProduct
} from '../actions/product.actions';
import {LoadingFalse} from './loading.state';
import {Navigate} from '@ngxs/router-plugin';
import {AddOnlineProductTag, GetOnlineProductTags, RemoveOnlineProductTag} from '../actions/online-product-tag.actions';
import {HttpService} from '../service/http/http.service';
import {Router} from '@angular/router';


@State<any[]>({
  name: 'allProducts',
  defaults: []
})
export class AllProductState {
  constructor(private dbService: FirestoreService, private  store: Store, private httpService: HttpService, private router: Router) {
  }


  @Action(UploadSingleProduct)
  uploadSingleProduct(cxt: StateContext<any[]>, {product}: UploadSingleProduct) {
    this.dbService.uploadSingleProduct(product).then(() => {
      this.store.dispatch([new SingleProductUploadedSuccessfully()]);
    }).catch((err) => this.store.dispatch([new SingleProductNotUploaded(err)]));
  }

  @Action(SingleProductUploadedSuccessfully)
  uploadSingleProductSuccessfully() {
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    this.store.dispatch([new LoadingFalse(), new Navigate([`u/${id}/store`])]);
  }

  @Action(GetAllProducts)
  getAllProducts(cxt: StateContext<any[]>, {storeId}: GetAllProducts) {
    this.dbService.getAllProducts(storeId);
  }

  @Action(GotAllProducts)
  gotAllProducts(cxt: StateContext<any[]>, {allProduct}: GotAllProducts) {
    cxt.setState(allProduct);
    this.store.dispatch([new LoadingFalse()]);
  }

  @Action(DeleteAProduct)
  deleteProduct(cxt: StateContext<any[]>, {productUid}: DeleteAProduct) {
    this.dbService
      .deleteProduct(productUid)
      .then(() => this.store.dispatch([new ProductDeletedSuccessfully()]))
      .catch((err) => this.store.dispatch([new ErrorInDeletingProduct(err)]));
  }

  @Action(ProductDeletedSuccessfully)
  productDeletedSuccessfully() {
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    return this.store.dispatch([new Navigate([`u/${id}/store`])]);
  }

  @Action(SearchForProduct)
  searchForProduct(cxt: StateContext<any[]>, {searchQuery}: SearchForProduct) {
    this.httpService.searchForProduct(searchQuery);
  }

  @Action(AddOnlineProductTag)
  addOnlineProductTag(cxt: StateContext<any>, {opt}: AddOnlineProductTag) {
    this.dbService.addOnlineProductTag(opt);
  }

  @Action(RemoveOnlineProductTag)
  removeOnlineProductTag(cxt: StateContext<any>, {onlineProductLink}: RemoveOnlineProductTag) {
    this.dbService.removeOnlineProductTag(onlineProductLink);
  }

  @Action(GetOnlineProductTags)
  getOnlineProductTags(cxt: StateContext<any>, {productUid}: GetOnlineProductTags) {
    this.dbService.getOnlineProductTags(productUid);
  }
}
