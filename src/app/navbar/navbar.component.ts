import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/auth.model';
import {Store} from '@ngxs/store';
import {Logout} from '../shared/actions/auth.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input('select') select;
loading;

user: User;

  constructor(private  store: Store) { }

  ngOnInit() {  }

  logout() {
   return this.store.dispatch(new Logout());
  }
}
