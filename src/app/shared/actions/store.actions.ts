import {ShopRegistrationForm} from '../models/store.model';

export class GetLinkedStores {
  static readonly type = '[Store] Get Linked Stores';
  constructor(public uid: string) {}
}
export class GotLinkedStores {
  static readonly type = '[Store] Got Linked Stores';
  constructor(public stores: any[]) {}
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
export class SelectStore {
  static readonly type = '[Store] Select store';
  constructor(public index: number) {}
}
export class ResetSelectedStore {
  static readonly type = '[Store] Reset selected store';
  constructor(public index: null) {}
}
export class GetEmployeeLinkedStores {
  static readonly type = '[Store] Getting employee linked stores';
  constructor(public linkedStores: string[]) {}
}
export class GotEmployeeLinkedStoresSuccessfully {
  static readonly type = '[Store] Got employee linked stores successfully';
  constructor(public stores: any[]) {}
}
export class ErrorInGettingEmployeeLinkedStore {
  static readonly type = '[Store] Error in getting employee linked store';
  constructor(public error: string) {}
}
export class GetAllEmployees {
  static readonly type = '[Store] Get all employees';
  constructor(public storeUid: string) {}
}
export class GotAllEmployeesSuccessfully {
  static readonly type = '[Store] Got all employees successfully';
  constructor(public employees: any[]) {}
}
export class DeleteEmployee {
  static readonly type = '[Store] Delete employee';
  constructor(public email: string) {}
}
export class EmployeeDeletedSuccessfully {
  static readonly type = '[Store] Employee deleted successfully ';
}
