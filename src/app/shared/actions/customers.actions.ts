export class CheckCustomerExitsOrNot {
  static readonly type = '[Customer] Check whether customer exit or not';

  constructor(public customerNumber: string) {
  }
}

export class CustomerNotExits {
  static readonly type = '[Customer] Customer not exit in clothx';
}

export class CustomerExits {
  static readonly type = '[Customer] Customer exit in clothx';

  constructor(public customerName: string) {
  }
}

export class CheckCustomerNewToStore {
  static readonly type = '[Customer] Check whether customer new to store';

  constructor(public customerNumber: string, public  storeId: string) {
  }
}

export class NewCustomerOfStore {
  static readonly type = '[Customer] New customer of store';
}

export class OldCustomerOfStore {
  static readonly type = '[Customer] Old customer of store';

  constructor(public  rewardDetail: object) {
  }
}
