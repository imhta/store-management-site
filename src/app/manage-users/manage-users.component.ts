import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserStoreState} from '../shared/models/store.model';
import {DeleteEmployee, GetAllEmployees, GotAllEmployeesSuccessfully} from '../shared/actions/store.actions';
import {Navigate} from '@ngxs/router-plugin';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
@Select('storeState') storeState$: Observable<object>;
  storeDataSubscription: Subscription;
  currentStore;
  employees: any[] = [];
  constructor(private store: Store, private actions$: Actions) { }

  ngOnInit() {
  this.getStoreId();
  this.store.dispatch([new GetAllEmployees(this.currentStore['storeUid'])]);
    this.actions$
      .pipe(ofActionDispatched(GotAllEmployeesSuccessfully))
      .subscribe(({employees}) => this.employees = employees );
  }
  getStoreId() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      const  storeState = new UserStoreState(data.valueOf());
      this.currentStore = storeState.linkedStores[storeState.selectedStore];
    });
  }
  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();
  }
  navigateToAddUser() {
    this.store.dispatch([new Navigate(['add/user'])]);
  }
  deleteEmployee(email: string) {
    return this.store.dispatch([new DeleteEmployee(email)]);
  }
}
