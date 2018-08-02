import { Action } from '@ngrx/store';
import {User, Store} from '../models/auth.model';

export const CHECK_SID           = 'Check sid';
export const SID_FOUND           = 'Sid found';
export const NETWORK_ERROR       = 'Network error';
export const SID_NOTFOUND        = 'Sid not found';
export const LOGIN               = 'Logging in';
export const LOGIN_SUCCESS       = 'Logedin successfully';
export const LOGIN_FAILED        = 'Login failed';


export class CheckSid implements Action {
  readonly type = CHECK_SID;
  constructor(public payload: string) {}
}

export class SidFound implements Action {
  readonly type = SID_FOUND;
  constructor(public payload: any) {}
}

export class NetworkError implements Action {
  readonly type = NETWORK_ERROR;
  constructor(public payload: any) {}
}

export class SidNotFound implements Action {
  readonly type = SID_NOTFOUND;
  constructor(public payload?: any) {}
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload?: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload?: User) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload?: any) {}
}


export type All
  = CheckSid
  | SidFound
  | SidNotFound
  | NetworkError
  | Login
  | LoginSuccess
  | LoginFailed;



