import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {


  constructor(private store: Store) { }

  ngOnInit() {
  }
  navigateToAddUser() {
    this.store.dispatch([new Navigate(['add/user'])]);
  }
}
