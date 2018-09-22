import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthState} from '../../../../state/auth.state';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class SellingGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = this.store.selectSnapshot(AuthState.role);
    return !!(role === 'Billing' || 'Manager' || 'Register');
  }
}
