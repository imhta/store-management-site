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

export class UploadStoreLogo {
  static readonly type = '[Store] Uploading store logo';

  constructor(public storeUid: string, public data: { localDownloadUrl: string, localPictureRef: string }) {
  }
}

export class StoreLogoUploadedSuccessfully {
  static readonly type = '[Store] store logo uploaded successfully';
}

export class ErrorInStoreLogoUpload {
  static readonly type = '[Store] Error in store logo upload';

  constructor(public error: string) {
  }
}

export class UploadStorePictures {
  static readonly type = '[Store] Uploading store pictures';

  constructor(public storeUid: string, public data: { localDownloadUrls: string[], localPictureRefs: string[] }) {
  }
}

export class StorePicturesUploadedSuccessfully {
  static readonly type = '[Store] store pictures uploaded successfully';
}

export class ErrorInStorePicturesUpload {
  static readonly type = '[Store] Error in store pictures upload';

  constructor(public error: string) {
  }
}

export class UpdateStoreDescription {
  static readonly type = '[Store] Update store description';

  constructor(public storeUid: string, public description: string) {
  }
}

export class UpdatedStoreDescriptionSuccessfully {
  static readonly type = '[Store] Store description updated successfully';
}

export class ErrorInUpdateStoreDescription {
  static readonly type = '[Store] Error in updating store description';

  constructor(public error: string) {
  }
}

export class UpdateUniqueStoreName {
  static readonly type = '[Store] Update store name';

  constructor(public storeUid: string, public usn: string) {
  }
}

export class UpdateUniqueStoreNameSuccessful {
  static readonly type = '[Store] Unique store name update successful';

  constructor(public result: boolean) {
  }
}

export class ErrorInUpdateUniqueStoreName {
  static readonly type = '[Store] Error in updating unique store name';

  constructor(public error: string) {
  }
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
