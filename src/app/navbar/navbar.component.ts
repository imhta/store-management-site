import {Component, OnInit} from '@angular/core';
import { UserModel} from '../shared/models/auth.model';
import {Select, Store} from '@ngxs/store';
import {Logout} from '../shared/actions/auth.actions';
import {LoadingTrue} from '../shared/state/loading.state';
import {UserStoreState} from '../shared/models/store.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Select('user') user$;
  @Select('storeState') storeState$;
  user: UserModel;
  storeState: UserStoreState;

  constructor(private  store: Store) {
  }

  ngOnInit() {
    this.user$.subscribe((data) => this.user = data.valueOf());
    this.storeState$.subscribe((data) => this.storeState = new UserStoreState(data.valueOf()));
}
  logout() {
    return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }
}
