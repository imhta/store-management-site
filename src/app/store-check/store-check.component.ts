import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

@Component({
  selector: 'app-store-check',
  templateUrl: './store-check.component.html',
  styleUrls: ['./store-check.component.css']
})
export class StoreCheckComponent implements OnInit {

sid = new FormControl('');
  constructor(private store: Store<any> ) { }

  ngOnInit() {

  }

  checkSid (sid) {
    this.store.dispatch(new authActions.CheckSid(sid));
  }
}
