import {Action, Actions, ofActionSuccessful, Selector, State, StateContext, Store} from '@ngxs/store';
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
import {AuthService} from '../../login/service/auth/auth.service';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './app-general.state';
import {FirestoreService} from '../service/firestore/firestore.service';
import {delay, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {
  EmptyLinkedStore,
  GetEmployeeLinkedStores,
  GetLinkedStores, GotEmployeeLinkedStoresSuccessfully,
  GotLinkedStores,
  ResetSelectedStore,
  SelectStoreOnly
} from '../actions/store.actions';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {GetAllProducts} from '../actions/product.actions';


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
    private router: Router,
    private actions$: Actions) {
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

    if (state.role === 'Register' && !state.isEmployee) {
      this.store.dispatch([new ResetSelectedStore(null), new GetLinkedStores(state.uid)]);
      this.actions$.pipe(ofActionSuccessful(GotLinkedStores), take(1)).subscribe(() => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          const returnUrlAsArray = returnUrl.split('/');

          if (returnUrlAsArray[2] === 'u') {
            this.store.dispatch(new SelectStoreOnly(+returnUrlAsArray[3]));
            this.actions$.pipe(ofActionSuccessful(SelectStoreOnly), take(1)).subscribe(() => {
              return this.store
                .dispatch([
                  new Navigate([returnUrl], {}, {replaceUrl: true}),
                  new LoadingFalse()
                ]);
            });

          } else {

            return this.store
              .dispatch([
                new Navigate([returnUrl], {}, {replaceUrl: true}),
                new LoadingFalse()
              ]);
          }


        } else {
          return this.store
            .dispatch([
              new Navigate(['authenticated'], {}, {replaceUrl: true}),
              new LoadingFalse()
            ]);
        }
      });


    } else if (state.isEmployee) {
      this.store.dispatch([new ResetSelectedStore(null), new GetEmployeeLinkedStores(state.employeeOf)]);
      this.actions$.pipe(ofActionSuccessful(GotEmployeeLinkedStoresSuccessfully), take(1)).subscribe(() => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          const returnUrlAsArray = returnUrl.split('/');

          if (returnUrlAsArray[2] === 'u') {
            this.store.dispatch(new SelectStoreOnly(+returnUrlAsArray[3]));
            this.actions$.pipe(ofActionSuccessful(SelectStoreOnly), take(1)).subscribe(() => {
              return this.store
                .dispatch([
                  new Navigate([returnUrl], {}, {replaceUrl: true}),
                  new LoadingFalse()
                ]);
            });

          } else {

            return this.store
              .dispatch([
                new Navigate([returnUrl], {}, {replaceUrl: true}),
                new LoadingFalse()
              ]);
          }


        } else {
          return this.store
            .dispatch([
              new Navigate(['authenticated'], {}, {replaceUrl: true}),
              new LoadingFalse()
            ]);
        }
      });
    } else if ((state.role && state.isEmployee && state.isRegister) === undefined || null) {
      this.store.dispatch([new EmptyLinkedStore()]);
    }


  }

  @Action([LogoutSuccessful])
  refreshAndNavigateToLogin() {
    this.store.dispatch([new Navigate(['login'], {}, {replaceUrl: true})]);
  }

  @Action([NotAuthenticated])
  navigateToLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) {
      return this.store.dispatch([new LoadingFalse(), new Navigate(['login', {returnUrl : returnUrl}])]);
    } else {
      return this.store.dispatch([new LoadingFalse(), new Navigate(['login'])]);
    }

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


