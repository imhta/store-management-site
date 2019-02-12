import {Action, State, StateContext} from '@ngxs/store';
import {UserStoreState} from '../models/store.model';
import {MatSnackBar} from '@angular/material/snack-bar';



export class LoadingTrue {
  static readonly type = '[App] Loading..';
}

export class LoadingFalse {
  static readonly type = '[App] Loading Completed..';
}

export class OpenSnackBarWithoutCustomAction {
  static readonly type = '[App] Open snack bar';

  constructor(public message: string) {
  }
}

@State<boolean>({
  name: 'loading',
  defaults: false
})
export class AppGeneralState {
  constructor(private snackBar: MatSnackBar) {
  }

  @Action(LoadingTrue)
  loadingTrue({setState}: StateContext<boolean>) {
    return setState(true);
  }

  @Action(LoadingFalse)
  loadingFalse({setState}: StateContext<boolean>) {
    return setState(false);
  }

  @Action(OpenSnackBarWithoutCustomAction)
  openSnackBarWithoutAction(ctx: StateContext<UserStoreState>, {message}: OpenSnackBarWithoutCustomAction) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

}
