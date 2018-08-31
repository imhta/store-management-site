import {Component, OnInit} from '@angular/core';
import { UserModel} from '../shared/models/auth.model';
import {Select, Store} from '@ngxs/store';
import {Logout} from '../shared/actions/auth.actions';
import {LoadingTrue} from '../shared/state/loading.state';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Select('loading') loading$;
  @Select('user') user$;
  loading: boolean;
  user: UserModel;


  constructor(private  store: Store) {
  }

  ngOnInit() {
    this.loading$.subscribe((data) => this.loading = data.valueOf());
    this.user$.subscribe((data) => this.user = data.valueOf());
}
  logout() {
    return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }
}
