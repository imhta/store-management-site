import { Action } from '@ngrx/store';
import {User} from '../models/auth.model';

export const NETWORK_ERROR       = 'Network error';
export const LOGIN               = 'Logging in';
export const LOGIN_SUCCESS       = 'Logedin successfully';
export const LOGIN_FAILED        = 'Login failed';
export const LOGOUT               = 'Logging out';
export const LOGOUT_SUCCESS       = 'Logedout successfully';
export const LOGOUT_FAILED        = 'Logout failed';



export class NetworkError implements Action {
  readonly type = NETWORK_ERROR;
  constructor(public payload: any) {}
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload?: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload?: any) {}
}
export class LogOut implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: User) {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public payload?: any) {}
}

export class LogoutFailed implements Action {
  readonly type = LOGOUT_FAILED;
  constructor(public payload?: any) {}
}

export type All
  = Login
  | NetworkError
  | LoginSuccess
  | LoginFailed
  | LogOut
  | LogoutSuccess
  | LogoutFailed;



