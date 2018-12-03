import {OnlineProductTagModel} from '../models/online-product-tag.model';


export class GetOnlineProductTags {
  static readonly type = '[OPT] Get online product tags';

  constructor(public productUid: string) {
  }
}

export class GotOnlineProductTagsSuccessfully {
  static readonly type = '[OPT] Got online product tags successfully';

  constructor(public opts: object[]) {
  }
}

export class ErrorInGettingOnlineProductTags {
  static readonly type = '[OPT-ERROR] Getting online product tags ';

  constructor(public error: string) {
  }
}

export class RemoveOnlineProductTag {
  static readonly type = '[OPT] Remove online product tag';

  constructor(public onlineProductLink: string) {
  }
}

export class RemovedOnlineProductTagSuccessfully {
  static readonly type = '[OPT] Removed online product tag successfully';

}

export class ErrorInRemovingOnlineProductTag {
  static readonly type = '[OPT-ERROR] Removing online product tag ';

  constructor(public error: string) {
  }
}

export class AddOnlineProductTag {
  static readonly type = '[OPT] Add online product tag';

  constructor(public opt: OnlineProductTagModel) {
  }
}

export class OnlineProductTagSuccessfullyAdded {
  static readonly type = '[OPT] Online product tag successfully added';

}

export class ErrorInAddingOnlineProductTag {
  static readonly type = '[OPT-ERROR] Adding online product tag ';

  constructor(public error: string) {
  }
}
