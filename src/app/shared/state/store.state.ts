import {Action, Select, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserStoreState} from '../models/store.model';
import {
  DeleteEmployee,
  EmployeeDeletedSuccessfully,
  GetAllEmployees,
  GetEmployeeLinkedStores,
  GetLinkedStores,
  GotEmployeeLinkedStoresSuccessfully,
  GotLinkedStores,
  NewStoreSetupNotSuccessful,
  NewStoreSetupSuccessfully,
  ResetSelectedStore,
  SelectStore,
  SetupNewStore,
  UpdateStoreDescription,
  UpdateUniqueStoreName,
  UploadStoreLogo,
  UploadStorePictures
} from '../actions/store.actions';
import {FirestoreService} from '../service/firestore/firestore.service';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './loading.state';
import {GetProductByUid} from '../actions/product.actions';
import {DeleteADiscount, GetAllDiscounts, UploadDiscount} from '../actions/discount.actions';
import {AuthState} from './auth.state';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {UserModel} from '../models/auth.model';


@State<UserStoreState>({
  name: 'storeState',
  defaults: {
    linkedStores: null,
    selectedStore: null
  }
})
export class StoreState {
  @Select('user') user$: Observable<UserModel>;
  user: UserModel;
  constructor(private dbService: FirestoreService, private  store: Store) {
    this.user$.pipe(take(5)).subscribe((data) => this.user = data);
  }

  @Selector()
  static uid(state: UserStoreState) {
    return state.linkedStores[state.selectedStore]['storeUid'];
  }

  @Selector()
  static hasNoGstNumber(state: UserStoreState) {
    return state.linkedStores[state.selectedStore]['hasNoGstNumber'];
  }
  @Action(GetLinkedStores)
  getLinkedStores(ctx: StateContext<any>, {uid}: GetLinkedStores) {
    this.dbService.getLinkedStore(uid).then().catch((err) => console.log(err));
  }

  @Action(GotLinkedStores)
  gotLinkedStores(ctx: StateContext<UserStoreState>, {stores}: GotLinkedStores) {
    const state = ctx.getState();
    state.linkedStores = stores;
    ctx.setState({...state});
    this.store.dispatch([new LoadingFalse()]);

  }

  @Action(SetupNewStore)
  // @ts-ignore
  async setupStore(ctx: StateContext<Null>, {store}: SetupNewStore) {
    await this.dbService.setupNewStore(store)
      .then(() => this.store.dispatch([new NewStoreSetupSuccessfully()]));
  }

  @Action(NewStoreSetupSuccessfully)
  newStoreSetupSuccessfully() {
    return this.store.dispatch([new LoadingFalse(), new Navigate(['/select/store'])]);
  }

  @Action(NewStoreSetupNotSuccessful)
  // @ts-ignore
  newStoreSetupNotSuccessful(ctx: StateContext<Null>, action: NewStoreSetupNotSuccessful) {
    console.log(action.error);
  }

  @Action(SelectStore)
  selectStore(ctx: StateContext<UserStoreState>, action: SelectStore) {
    const state = ctx.getState();
    state.selectedStore = action.index;
    ctx.setState({...state});
    if (this.user.role === 'Register') {
      return this.store.dispatch([new Navigate(['dashboard'])]);
    } else {
      return this.store.dispatch([new Navigate(['store'])]);
    }
  }

  @Action(ResetSelectedStore)
  resetSelectedStore(ctx: StateContext<UserStoreState>, action: ResetSelectedStore) {
    const state = ctx.getState();
    state.selectedStore = action.index;
    ctx.setState({...state});
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(GetEmployeeLinkedStores)
  getEmployeeLinkedStores(ctx: StateContext<any>, {linkedStores}: GetEmployeeLinkedStores) {
    return this.dbService.GetEmployeeLinkedStore(linkedStores);
  }

  @Action(GotEmployeeLinkedStoresSuccessfully)
  gotEmployeeLinkedStoresSuccessfully(ctx: StateContext<UserStoreState>, {stores}: GotEmployeeLinkedStoresSuccessfully) {
    const state = ctx.getState();
    state.linkedStores = stores;
    console.log(stores.length);
    ctx.setState({...state});
    this.store.dispatch([new LoadingFalse()]);

  }

  @Action(GetAllEmployees)
  getAllEmployees(ctx: StateContext<any>, {storeUid}: GetAllEmployees) {
    this.dbService.getExtraUser(storeUid);
  }

  @Action(DeleteEmployee)
  deleteEmployee(ctx: StateContext<any>, {email}: DeleteEmployee) {
    this.dbService.deleteExtraUser(email)
      .then(() => this.store.dispatch([new EmployeeDeletedSuccessfully(), new Navigate(['manage/users'])]));
  }

  @Action(GetProductByUid)
  getProductById(ctx: StateContext<any>, {productUid}: GetProductByUid) {
    this.dbService.getProductById(productUid);
  }

  @Action(UploadStoreLogo)
  uploadStoreLogo(ctx: StateContext<any>, {storeUid, data}: UploadStoreLogo) {
    this.dbService.uploadStoreLogo(storeUid, data);
  }

  @Action(UploadStorePictures)
  uploadStorePictures(ctx: StateContext<any>, {storeUid, data}: UploadStorePictures) {
    this.dbService.uploadStorePictures(storeUid, data);
  }

  @Action(UpdateStoreDescription)
  updateStoreDescription(ctx: StateContext<any>, {storeUid, description}: UpdateStoreDescription) {
    this.dbService.updateStoreDescription(storeUid, description);

  }

  @Action(UpdateUniqueStoreName)
  updateUniqueStoreName(ctx: StateContext<any>, {storeUid, usn}: UpdateUniqueStoreName) {
    this.dbService.updateUniqueStoreName(storeUid, usn);

  }

  @Action(UploadDiscount)
  uploadDiscount(ctx: StateContext<any>, {discount}: UploadDiscount) {
    this.dbService.uploadDiscount(discount);
  }

  @Action(GetAllDiscounts)
  getAllDiscounts(ctx: StateContext<any>, {storeId}: GetAllDiscounts) {
    this.dbService.getAllDiscount(storeId);
  }

  @Action(DeleteADiscount)
  deleteADiscount(ctx: StateContext<any>, {discountUid}: DeleteADiscount) {
    this.dbService.deleteDiscount(discountUid);
  }
}
