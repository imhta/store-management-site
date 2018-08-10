import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserModel} from '../../models/auth.model';
import {
  Login,
  Logout,
  LogoutFailed,
  LogoutSuccessful,
  LoginFailed,
  LoginSuccessful,
  CheckAuthState,
  Authenticated, NotAuthenticated
} from '../actions/auth.actions';
import {AuthService} from '../../service/auth/auth.service';
import { Navigate } from '@ngxs/router-plugin';
import {LoadingFalse} from './loading.state';
@State<UserModel>({
  name: 'user',
  defaults: null
})
export class AuthState {

  @Selector()
  static role(state: UserModel) { return state.role; }
  @Selector()
  static token(state: UserModel) { return state.token; }

  constructor(private authService: AuthService, private  store: Store) {
  }
  @Action(CheckAuthState)
  async checkAuthState({setState}: StateContext<UserModel>) {

    await this.authService
      .checkAuth()
      .then((user) => user
        .subscribe((userData) => {
          if (userData !== null) {
            setState(userData);
            return this.store.dispatch(new Authenticated());
          } else {
            return this.store.dispatch(new NotAuthenticated());
          }
        }));
  }

  @Action(Login)
  async login({setState}: StateContext<UserModel>) {
    await this.authService.googleLogin()
      .then((data) => {
        setState(data);
        return this.store.dispatch(new LoginSuccessful());
      })
      .catch((err) => this.store.dispatch([new LoadingFalse(), new LoginFailed(err)]));

  }

  @Action(Logout)
  async logout({setState}: StateContext<UserModel>) {
    await this.authService.signOut()
      .then(() => {
        setState(null);
        return this.store.dispatch( new LogoutSuccessful());
      })
      .catch((err) => this.store.dispatch([new LoadingFalse(), new LogoutFailed(err)]));
  }
  @Action([LoginSuccessful, Authenticated])
  navigateToHome() {
    return this.store.dispatch([new LoadingFalse(), new Navigate(['/home'])]);
  }
  @Action([LogoutSuccessful, NotAuthenticated])
  navigateToLogin() {
    return this.store.dispatch([new LoadingFalse(), new Navigate([''])]);
  }
}


