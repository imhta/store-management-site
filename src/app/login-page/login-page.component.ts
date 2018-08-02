import { AppState } from './../models/app-state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  sid$: Observable<string>;
  storeid;
  error;
  loading;
  constructor(private store: Store<AppState>) {
    this.sid$ = this.store.select('sid');
  }

  ngOnInit() {
      this.sid$.subscribe((sid) => {
        this.storeid = sid['sid'];
        this.error = sid['error'];
        this.loading = sid['loading'];
      });
  }

}
