import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.store.selectSnapshot(AuthState.token);
    return token !== undefined;
  }
}
