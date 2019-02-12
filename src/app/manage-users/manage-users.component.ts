import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserStoreState} from '../shared/models/store.model';
import {DeleteEmployee, EmployeeDeletedSuccessfully, GetAllEmployees, GotAllEmployeesSuccessfully} from '../shared/actions/store.actions';
import {Navigate} from '@ngxs/router-plugin';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

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

  constructor(private store: Store, private actions$: Actions, private router: Router) {
  }

  ngOnInit() {
    this.getStoreId();
    this.store.dispatch([new GetAllEmployees(this.currentStore['storeUid'])]);
    this.actions$
      .pipe(ofActionDispatched(GotAllEmployeesSuccessfully))
      .subscribe(({employees}) => this.employees = employees);
  }

  getStoreId() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      const storeState = new UserStoreState(data.valueOf());
      this.currentStore = storeState.linkedStores[storeState.selectedStore];
    });
  }

  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();
  }

  navigateToAddUser() {
    const id = +this.router.routerState.snapshot.url.split('/')[3];
    return this.store.dispatch([new Navigate([`go/u/${id}/add/user`])]);

  }

  deleteEmployee(email: string) {
    this.store.dispatch([new DeleteEmployee(email)]);
    this.actions$.pipe(ofActionDispatched(EmployeeDeletedSuccessfully), take(1))
      .subscribe(() => this.employees = this.employees.filter((employee) => employee.email !== email));
  }
}
