import {ShopRegistrationForm} from '../models/store.model';

export class GetLinkedStores {
  static readonly type = '[Store] Get Linked Stores';
}
export class GotLinkedStores {
  static readonly type = '[Store] Got Linked Stores';
  constructor(public stores: ShopRegistrationForm[]) {}
}
export class EmptyLinkedStore {
  static readonly type = '[Store] Empty Linked Stores';
}
export class NewStoreSetupSuccessfully {
  static readonly type = '[Store] New Store Setup successfully';
}
export class SetupNewStore  {
  static readonly type = '[Store] Setup New Store';
  constructor( public store: ShopRegistrationForm) {   }
}
export class NewStoreSetupNotSuccessful {
  static readonly type = '[Store] Error Occurred While Setup new store';
  constructor(public error: string) {}
}
export class ErrorInGetLinkedStore {
  static readonly type = '[Store] Error Occurred While Getting Store';
  constructor(public error: string) {}
}
