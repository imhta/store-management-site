import {Action, State, StateContext, Store} from '@ngxs/store';
import {ShopRegistrationForm, UserStoreState} from '../models/store.model';
import {
  GetLinkedStores,
  GotLinkedStores,
  NewStoreSetupNotSuccessful,
  NewStoreSetupSuccessfully, ResetSelectedStore, SelectStore,
  SetupNewStore
} from '../actions/store.actions';
import {FirestoreService} from '../service/firestore/firestore.service';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './loading.state';


@State<UserStoreState>({
  name: 'storeState',
  defaults: {
    linkedStores: null,
    selectedStore: null
  }
})
export class StoreState {
  constructor( private dbService: FirestoreService, private  store: Store) {}
  @Action(GetLinkedStores)
  getLinkedStores() {
    this.dbService.getLinkedStore().then().catch((err) => console.log(err));
  }
  @Action(GotLinkedStores)
 gotLinkedStores(ctx: StateContext<UserStoreState>, { stores }: GotLinkedStores) {
        const state = ctx.getState();
        state.linkedStores = stores;
        ctx.setState({...state});
        this.store.dispatch([new LoadingFalse()]);

  }
  @Action(SetupNewStore)
  // @ts-ignore
  async setupStore(ctx: StateContext<Null>, { store }: SetupNewStore) {
    await this.dbService.setupNewStore(store)
      .then(() => this.store.dispatch([ new NewStoreSetupSuccessfully()]) );
  }
  @Action(NewStoreSetupSuccessfully)
  newStoreSetupSuccessfully() {
    return this.store.dispatch([new LoadingFalse(),  new Navigate(['/select/store'])]);
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
    return this.store.dispatch([new LoadingFalse(), new Navigate(['add/product'])]);
  }
  @Action(ResetSelectedStore)
  resetSelectedStore(ctx: StateContext<UserStoreState>, action: ResetSelectedStore) {
    const state = ctx.getState();
    state.selectedStore = action.index;
    ctx.setState({...state});
    return this.store.dispatch([new LoadingFalse()]);
  }

}
