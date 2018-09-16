import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserStoreState} from '../models/store.model';
import {
  DeleteEmployee, EmployeeDeletedSuccessfully,
  GetAllEmployees,
  GetEmployeeLinkedStores,
  GetLinkedStores, GotEmployeeLinkedStoresSuccessfully,
  GotLinkedStores,
  NewStoreSetupNotSuccessful,
  NewStoreSetupSuccessfully, ResetSelectedStore, SelectStore,
  SetupNewStore
} from '../actions/store.actions';
import {FirestoreService} from '../service/firestore/firestore.service';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './loading.state';
import {UserModel} from '../models/auth.model';


@State<UserStoreState>({
  name: 'storeState',
  defaults: {
    linkedStores: null,
    selectedStore: null
  }
})
export class StoreState {
  @Selector()
  static uid(state: UserStoreState) {
    return state.linkedStores[state.selectedStore]['storeUid'];
  }

  constructor(private dbService: FirestoreService, private  store: Store) {
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
    return this.store.dispatch([new LoadingFalse(), new Navigate(['store'])]);
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
}
