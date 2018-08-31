import {Action, State, Store} from '@ngxs/store';
import {ShopRegistrationForm} from '../models/store.model';
import {GetLinkedStores, NewStoreSetupNotSuccessful, NewStoreSetupSuccessfully, SetupNewStore} from '../actions/store.actions';
import {FirestoreService} from '../service/firestore/firestore.service';
import {Navigate} from '@ngxs/router-plugin';


@State<ShopRegistrationForm[]>({
  name: 'stores',
  defaults: null
})
export class StoreState {
  constructor( private dbService: FirestoreService, private  store: Store) {}
  @Action(GetLinkedStores)
  getLinkedStores() {
    this.dbService.getLinkedStore();
  }

  @Action(SetupNewStore)
  async setupStore({ store }: SetupNewStore) {
    console.log(store);
    // await this.dbService.setupNewStore(action.store)
    //   .then(() => this.store.dispatch([new NewStoreSetupSuccessfully()]) );
  }
  @Action(NewStoreSetupSuccessfully)
  newStoreSetupSuccessfully() {
    return this.store.dispatch([new Navigate(['/manage'])]);
  }
  @Action(NewStoreSetupNotSuccessful)
  newStoreSetupNotSuccessful(action: NewStoreSetupNotSuccessful) {
    console.log(action.error);
  }
}
