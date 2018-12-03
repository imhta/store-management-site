import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthState} from '../../../../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class StoreCreatorGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = this.store.selectSnapshot(AuthState.role);
    const isEmployee = this.store.selectSnapshot(AuthState.isEmployee);
    const isRegister = this.store.selectSnapshot(AuthState.isRegister);
    return ((role === 'Register' && isRegister) || !isEmployee);
  }
}
