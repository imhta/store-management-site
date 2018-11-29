import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserModel} from '../models/auth.model';
import {
  AddExtraUser,
  Authenticated,
  CheckAuthState,
  ErrorInAddingExtraUser,
  ExtraUserAddedSuccessfully,
  Login,
  LoginFailed,
  LoginSuccessful,
  Logout,
  LogoutFailed,
  LogoutSuccessful,
  NotAuthenticated
} from '../actions/auth.actions';
import {AuthService} from '../service/auth/auth.service';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './loading.state';
import {FirestoreService} from '../service/firestore/firestore.service';
import {delay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@State<UserModel>({
  name: 'user',
  defaults: null
})
export class AuthState {
  constructor(
    private authService: AuthService,
    private  store: Store,
    private dbService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  @Selector()
  static uid(state: UserModel) {
    return state.uid;
  }

  @Selector()
  static role(state: UserModel) {
    return state.role;
  }

  @Selector()
  static isEmployee(state: UserModel) {
    return state.isEmployee;
  }

  @Selector()
  static isRegister(state: UserModel) {
    return state.isRegister;
  }

  @Selector()
  static token(state: UserModel) {
    return state.token;
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
        delay(2000);
        return this.store.dispatch(new LoginSuccessful());
      })
      .catch((err) => {
        console.log(err);
        this.store.dispatch([new LoadingFalse(), new LoginFailed(err)]);
      });

  }

  @Action(Logout)
  async logout({setState}: StateContext<UserModel>) {
    await this.authService.signOut()
      .then(() => {
        setState(null);
        return this.store.dispatch(new LogoutSuccessful());
      })
      .catch((err) => this.store.dispatch([new LoadingFalse(), new LogoutFailed(err)]));
  }

  @Action([LoginSuccessful, Authenticated])
  navigateToHome(ctx: StateContext<UserModel>) {
    const state = ctx.getState();
    console.log(this.route.snapshot.queryParamMap.get('returnUrl'));
    return this.store
      .dispatch([
        new Navigate(['authenticated'], {}, {replaceUrl: true}),
        new LoadingFalse()
      ]);
  }

  @Action([LogoutSuccessful])
  refreshAndNavigateToLogin() {
    window.location.replace('/');
  }

  @Action([NotAuthenticated])
  navigateToLogin() {
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(AddExtraUser)
  addExtraUser(ctx: StateContext<UserModel>, {extraUser}: AddExtraUser) {
    return this.dbService
      .addingExtraUser(extraUser)
      .then(() => this.store.dispatch([new ExtraUserAddedSuccessfully()]))
      .catch((err) => this.store.dispatch([new ErrorInAddingExtraUser(err)]));
  }

  @Action(ExtraUserAddedSuccessfully)
  extraUserAddedSuccessfully() {
    const id = +this.router.routerState.snapshot.url.split('/')[2];

    return this.store.dispatch([new LoadingFalse(), new Navigate([`u/${id}/manage/users`])]);
  }
}


