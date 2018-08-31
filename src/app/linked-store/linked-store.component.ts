import { Component, OnInit } from '@angular/core';
import { Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {GetLinkedStores} from '../shared/actions/store.actions';


@Component({
  selector: 'app-linked-store',
  templateUrl: './linked-store.component.html',
  styleUrls: ['./linked-store.component.css']
})
export class LinkedStoreComponent implements OnInit {

  constructor(private store: Store) { }

 ngOnInit() {
   this.store.dispatch(new GetLinkedStores());
  }
  navigateToSetupStore() {
    return this.store.dispatch(new Navigate(['store/setup']));
  }
}
