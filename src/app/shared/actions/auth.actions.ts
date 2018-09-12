import {ExtraUser} from '../models/auth.model';


export class CheckAuthState {
  static readonly type = '[Auth] Checking Auth State';
}
export class Authenticated {
  static readonly type = '[Auth] Already Authenticated';
}

export class NotAuthenticated {
  static readonly type = '[Auth] Not already Authenticated';
}

export class Login {
  static readonly type = '[Auth] Attempt Login';
}

export class LoginSuccessful {
  static readonly type = '[Auth] Login Successful';
}

export class LoginFailed {
  static readonly type = '[Auth] Login Attempt Failed';
  constructor(public  error: string) {}
}


export class Logout {
  static readonly type = '[Auth] Attempt Logout';
}

export class LogoutSuccessful {
  static readonly type = '[Auth] Logout Successful';

}

export class LogoutFailed {
  static readonly type = '[Auth] Logout Attempt Failed';
  constructor(public  error: string) {}
}

export class AddExtraUser {
  static readonly type = '[Auth] Add Extra User';
  constructor(public  extraUser: ExtraUser) {}
}
export class ExtraUserAddedSuccessfully {
  static readonly type = '[Auth] Extra User added successfully';
}
export class ErrorInAddingExtraUser {
  static readonly type = '[Auth] Error in adding extra user';
  constructor(public  error: string) {}
}
