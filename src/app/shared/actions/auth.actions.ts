import {User} from 'firebase';

export class Login {
  static readonly type = '[Auth] Attempt Login';
}

export class LoginSuccessful {
  static readonly type = '[Auth] Login Successful';
  constructor(private  payload: User) {}
}

export class LoginFailed {
  static readonly type = '[Auth] Login Attempt Failed';
  constructor(private  error: string) {}
}


export class Logout {
  static readonly type = '[Auth] Attempt Logout';
}

export class LogoutSuccessful {
  static readonly type = '[Auth] Logout Successful';
  constructor(private  payload: null) {}
}

export class LogoutFailed {
  static readonly type = '[Auth] Logout Attempt Failed';
  constructor(private  error: string) {}
}
