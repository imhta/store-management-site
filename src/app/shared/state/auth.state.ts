import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserModel} from '../../models/auth.model';
import {Login, Logout, LogoutFailed, LogoutSuccessful, LoginFailed, LoginSuccessful} from '../actions/auth.actions';
import {AuthService} from '../../service/auth/auth.service';
import { Navigate } from '@ngxs/router-plugin';
​
@State<UserModel>({
  name: 'user',
  defaults: {
    role: 'unknown'
  }
})
export class AuthState {
  @Selector()
  static role(state: UserModel) { return state.role; }
  constructor(private authService: AuthService, private  store: Store) {
  }

  @Action(Login)
  async login({setState}: StateContext<UserModel>) {
    await this.authService.googleLogin()
      .then((user) => {
        setState(user);
        return this.store.dispatch(new LoginSuccessful());
      })
      .catch((err) => this.store.dispatch(new LoginFailed(err)));

  }

  @Action(Logout)
  async logout({setState}: StateContext<UserModel>) {
    await this.authService.signOut()
      .then(() => {
        setState({role: 'unknown'});
        return this.store.dispatch(new LogoutSuccessful());
      })
      .catch((err) => this.store.dispatch(new LogoutFailed(err)));
  }
  @Action(LoginSuccessful)
  navigateToHome() {
    return this.store.dispatch(new Navigate(['/home']));
  }
  @Action(LogoutSuccessful)

  navigateToLogin() {
    return this.store.dispatch(new Navigate(['']));
  }
}


