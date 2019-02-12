import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from '../../../shared/models/auth.model';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Logout} from '../../../shared/actions/auth.actions';
import {LoadingTrue} from '../../../shared/state/app-general.state';
import {UserStoreState} from '../../../shared/models/store.model';
import {Navigate} from '@ngxs/router-plugin';
import {EmptyLinkedStore, ResetSelectedStore} from '../../../shared/actions/store.actions';
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
    return this.store.dispatch([new ResetSelectedStore(null), new Navigate(['go'])]);
  }

  navigateTo(path: string) {
    const id = +this.router.routerState.snapshot.url.split('/')[3];
    this.toggle.emit(true);
    return this.store.dispatch([new Navigate([`go/u/${id}/${path}`])]);
  }

  logout() {
    this.toggle.emit(true);
    return this.store.dispatch([new LoadingTrue(), new Logout()]);
  }

  navigateToSetupStore() {
    this.toggle.emit(true);
    return this.store.dispatch(new Navigate(['go/setup/store']));
  }

  navigateToHelp() {
    this.toggle.emit(true);
    window.open('https://docs.spoteasy.in/guide/general', '_blank');
  }

}
