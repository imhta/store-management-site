import { Component, OnInit } from '@angular/core';
import {LoadingTrue} from '../shared/state/app-general.state';
import {CheckAuthState} from '../shared/actions/auth.actions';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-auth-check-loading-page',
  templateUrl: './auth-check-loading-page.component.html',
  styleUrls: ['./auth-check-loading-page.component.css']
})
export class AuthCheckLoadingPageComponent implements OnInit {

  constructor(private store: Store) {
    this.store.dispatch([new LoadingTrue(), new CheckAuthState()]);
  }

  ngOnInit() {}

}
