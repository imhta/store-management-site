import {Action, Actions, Select, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserStoreState} from '../models/store.model';
import {
  DeleteEmployee,
  EmployeeDeletedSuccessfully,
  EmptyLinkedStore, GetAll,
  GetAllEmployees, GetConfig,
  GetEmployeeLinkedStores,
  GetLinkedStores,
  GotConfig,
  GotEmployeeLinkedStoresSuccessfully,
  GotLinkedStores,
  NewStoreSetupNotSuccessful,
  NewStoreSetupSuccessfully,
  ResetSelectedStore,
  SelectStore,
  SelectStoreOnly,
  SetupNewStore,
  UpdateStoreDescription,
  UpdateUniqueStoreName,
  UploadStoreLogo,
  UploadStorePictures
} from '../actions/store.actions';
import {FirestoreService} from '../service/firestore/firestore.service';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './app-general.state';
import {GetAllProducts, GetProductByUid} from '../actions/product.actions';
import {DeleteADiscount, GetAllDiscounts, UploadDiscount} from '../actions/discount.actions';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {UserModel} from '../models/auth.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GetAllInvoice} from '../actions/invoice.actions';
import {GetAllReturns} from '../actions/return.actions';


@State<UserStoreState>({
  name: 'storeState',
  defaults: {
    linkedStores: null,
    selectedStore: null,
    currentStoreConfig: {
      brands: [],
      attributes: [],
      categories: [],
      suppliers: [],
      units: [],
      taxes: []
    }
  }
})
export class StoreState {
  @Select('user') user$: Observable<UserModel>;
  user: UserModel;

  constructor(private dbService: FirestoreService,
              private  store: Store,
              private router: Router,
              private route: ActivatedRoute,
              private actions$: Actions) {
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

    this.dbService.getLinkedStore(uid)
      .subscribe((data) => {
        if (data.length > 0) {
          return this.store.dispatch([new GotLinkedStores(data)]);
        } else {
          return this.store.dispatch([new EmptyLinkedStore()]);
        }
      });
  }

  @Action(GotLinkedStores)
  gotLinkedStores(ctx: StateContext<UserStoreState>, {stores}: GotLinkedStores) {
    const state = ctx.getState();
    ctx.setState({...state, linkedStores: stores});

  }

  @Action(GetEmployeeLinkedStores)
  getEmployeeLinkedStores(ctx: StateContext<any>, {linkedStores}: GetEmployeeLinkedStores) {
    return this.dbService.GetEmployeeLinkedStore(linkedStores);
  }

  @Action(GotEmployeeLinkedStoresSuccessfully)
  gotEmployeeLinkedStoresSuccessfully(ctx: StateContext<UserStoreState>, {stores}: GotEmployeeLinkedStoresSuccessfully) {
    const state = ctx.getState();
    ctx.setState({...state, linkedStores: stores});
  }

  @Action(SetupNewStore)
  // @ts-ignore
  async setupStore(ctx: StateContext<Null>, {store}: SetupNewStore) {
    await this.dbService.setupNewStore(store)
      .then(() => this.store.dispatch([new NewStoreSetupSuccessfully()]));
  }

  @Action(NewStoreSetupSuccessfully)
  newStoreSetupSuccessfully() {
    return this.store.dispatch([new LoadingFalse(), new Navigate(['go'])]);
  }

  @Action(NewStoreSetupNotSuccessful)
  // @ts-ignore
  newStoreSetupNotSuccessful(ctx: StateContext<Null>, action: NewStoreSetupNotSuccessful) {
    console.log(action.error);
  }

  @Action(SelectStore)
  selectStore(ctx: StateContext<UserStoreState>, action: SelectStore) {
    const state = ctx.getState();
    ctx.setState({...state, selectedStore: action.index});
    if (this.user.role === 'Register') {
      return this.store.dispatch([
        new Navigate(['go/u', action.index, 'dashboard']),
        new GetAll(action.index)
      ]);
    } else {
      return this.store.dispatch([
        new Navigate([`go/u/${action.index}/products`]),
        new GetAll(action.index)
      ]);
    }
  }

  @Action(SelectStoreOnly)
  selectStoreOnly(ctx: StateContext<UserStoreState>, action: SelectStoreOnly) {
    const state = ctx.getState();
    ctx.setState({...state, selectedStore: action.index});
    this.store.dispatch([new GetAll(action.index)]);
  }



  @Action(ResetSelectedStore)
  resetSelectedStore(ctx: StateContext<UserStoreState>, action: ResetSelectedStore) {
    const state = ctx.getState();
    ctx.setState({...state, selectedStore: action.index});
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(GetAll)
  getAll(ctx: StateContext<UserStoreState>, {index}: GetAll) {
    const state = ctx.getState();
    this.store.dispatch([
      new GetConfig(state.linkedStores[index]['storeUid']),
      new GetAllDiscounts(state.linkedStores[index]['storeUid']),
      new GetAllEmployees(state.linkedStores[index]['storeUid']),
      new GetAllInvoice(state.linkedStores[index]['storeUid']),
      new GetAllProducts(state.linkedStores[index]['storeUid']),
      new GetAllReturns(state.linkedStores[index]['storeUid']),
    ]);
  }

  @Action(GetAllEmployees)
  getAllEmployees(ctx: StateContext<any>, {storeUid}: GetAllEmployees) {
    this.dbService.getExtraUser(storeUid);
  }

  @Action(DeleteEmployee)
  deleteEmployee(ctx: StateContext<any>, {email}: DeleteEmployee) {
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    this.dbService.deleteExtraUser(email)
      .then(() => this.store.dispatch([new EmployeeDeletedSuccessfully(), new Navigate([`go/u/${id}/manage/users`])]));
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
  @Action(GetConfig)
  getConfig(ctx: StateContext<UserStoreState>, {storeId}: GetConfig) {
    this.dbService.getAllConfig(storeId);
  }
  @Action(GotConfig)
  gotConfig(ctx: StateContext<UserStoreState>, {type, data}: GotConfig) {
    const state = ctx.getState();
    switch (type) {
      case 'brands': {
        ctx.setState({...state, currentStoreConfig: {...state.currentStoreConfig, brands: data}});
        break;
      }
      case 'attributes': {
        ctx.setState({...state, currentStoreConfig: {...state.currentStoreConfig, attributes: data}});
        break;
      }
      case 'categories': {
        ctx.setState({...state, currentStoreConfig: {...state.currentStoreConfig, categories: data}});
        break;
      }
      case 'suppliers': {
        ctx.setState({...state, currentStoreConfig: {...state.currentStoreConfig, suppliers: data}});
        break;
      }
      case 'units': {
        ctx.setState({...state, currentStoreConfig: {...state.currentStoreConfig, units: data}});
        break;
      }
      case 'taxes': {
        ctx.setState({...state, currentStoreConfig: {...state.currentStoreConfig, taxes: data}});
        break;
      }
    }

  }


}
