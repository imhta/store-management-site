import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthState} from '../../../../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AddProductGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = this.store.selectSnapshot(AuthState.role);
    return !!(role === 'Data entry' || 'Manager' || 'Register');
  }
}
