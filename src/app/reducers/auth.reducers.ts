import * as AuthActions from '../actions/auth.actions';
import { User, Store } from '../models/auth.model';

export type Action = AuthActions.All;

/// Reducer function
export function authReducer(state: User, action: Action) {
  switch (action.type) {
    case AuthActions.NETWORK_ERROR:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.LOGIN:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.LOGIN_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.LOGIN_FAILED:
      return { ...state, ...action.payload, loading: false };

    default:
      return state;
  }

}


export function storeCheckReducer(state: Store, action: Action) {

  switch (action.type) {
    case AuthActions.CHECK_SID:
      return {sid: null, error: null, loading: true};

    case AuthActions.NETWORK_ERROR:
      return {sid: null, error: null, loading: false};

    case AuthActions.SID_FOUND:
      return {sid: action.payload, error: null, loading: false};

    case AuthActions.SID_NOTFOUND:
      return {sid: null, error: 'your store id not found', loading: false };

    default:
      return {sid: null, error: null, loading: false};
  }

}
