import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from '../../models/auth.model';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Logout} from '../../actions/auth.actions';
import {LoadingTrue} from '../../state/loading.state';
import {UserStoreState} from '../../models/store.model';
import {Navigate} from '@ngxs/router-plugin';
import {EmptyLinkedStore, ResetSelectedStore} from '../../actions/store.actions';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Select('user') user$;
  @Select('storeState') storeState$;
  @Output() toggle = new EventEmitter<boolean>();
  user: UserModel;
  storeState: UserStoreState;
  linkedStoreEmpty: boolean;


  constructor(private  store: Store, private actions$: Actions, private route: ActivatedRoute, private router: Router) {

    this.linkedStoreEmpty = false;
    this.user$
      .subscribe((data) => {
        if (data !== null) {
          this.user = data.valueOf();
        }
      });

    this.actions$
      .pipe(ofActionDispatched(EmptyLinkedStore))
      .subscribe(() => this.linkedStoreEmpty = true);
    this.storeState$
      .subscribe((data) => this.storeState = new UserStoreState(data.valueOf()));
  }

  ngOnInit() {

  }

  navigateToManageStore() {
    this.toggle.emit(true);
    return this.store.dispatch([new ResetSelectedStore(null), new Navigate(['home'])]);
  }

  navigateTo(path: string) {
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    this.toggle.emit(true);
    return this.store.dispatch([new Navigate([`u/${id}/${path}`])]);
  }

  logout() {
    this.toggle.emit(true);
    return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }

  navigateToSetupStore() {
    this.toggle.emit(true);
    return this.store.dispatch(new Navigate(['setup/store']));
  }

  navigateToHelp() {
    this.toggle.emit(true);
    window.open('https://docs.spoteasy.in', '_blank');
  }

}
