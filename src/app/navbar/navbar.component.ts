import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../models/auth.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input('select') select;
loading;
user$: Observable<User>;
user: User;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {  }
  logOut() {
    this.loading = true;
    return this.store.dispatch(new AuthActions.LogOut());
  }
}
