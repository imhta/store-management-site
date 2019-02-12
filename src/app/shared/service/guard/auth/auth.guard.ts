import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthState} from '../../../state/auth.state';
import {LoadingFalse} from '../../../state/app-general.state';
import {Navigate} from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<boolean> {
  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== undefined) {
      return true;
    }
    this.store.dispatch([new LoadingFalse(), new Navigate([''], {returnUrl: state.url})]);
    return false;
  }

  canDeactivate(): boolean {
    const token = this.store.selectSnapshot(AuthState.token);
    return token !== undefined;

  }
}
