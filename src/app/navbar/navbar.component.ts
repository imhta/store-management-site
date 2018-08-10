import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/auth.model';
import {Select, Store} from '@ngxs/store';
import {Logout} from '../shared/actions/auth.actions';
import {LoadingTrue} from '../shared/state/loading.state';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input('select') select;
@Select('loading') loading$;
loading: boolean;

user: User;

  constructor(private  store: Store) { }

  ngOnInit() {
    this.loading$.subscribe((data) => this.loading = data.valueOf());
  }

  logout() {
   return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }
}
