import * as AuthActions from '../actions/auth.actions';
import { User } from '../models/auth.model';

export type Action = AuthActions.All;

/// Reducer function
export function authReducer(state: User, action: Action) {
  switch (action.type) {
    case AuthActions.NETWORK_ERROR:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.LOGIN:
      return { ...state, ...action.payload, loading: true };

    case AuthActions.LOGIN_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.LOGIN_FAILED:
      return { ...state, ...action.payload, loading: false };
    case AuthActions.LOGOUT:
      return { ...state, ...action.payload, loading: true };

    case AuthActions.LOGOUT_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case AuthActions.LOGOUT_FAILED:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
}
