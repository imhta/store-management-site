import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {ExtraUser} from '../../shared/models/auth.model';
import {UserStoreState} from '../../shared/models/store.model';
import {FormBuilder, Validators} from '@angular/forms';
import {LoadingTrue} from '../../shared/state/loading.state';
import {AddExtraUser} from '../../shared/actions/auth.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  @Select('user') user$: Observable<object>;
  @Select('storeState') storeState$: Observable<object>;
  userDataSubscription: Subscription;
  storeDataSubscription: Subscription;
  user: any;
  storeState: UserStoreState;
  roles = ['Data entry', 'Manager', 'Billing', 'Register'];
  userAddingForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    role: ['Data entry'],
    storeUid: [''],
    createdBy: [''],

  });


  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit() {
    this.addStoreId();
    this.addAddedBy();
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.userAddingForm.valid) {
      this.addStoreId();
      this.addAddedBy();
      const extraUser = new ExtraUser(this.userAddingForm.value);
      this.store.dispatch([new LoadingTrue(), new AddExtraUser(extraUser)]);
      this.userAddingForm.patchValue({role: this.roles[0]});
      this.userAddingForm.reset();

    } else {
      Object.keys(this.userAddingForm.controls).forEach(key => {
        this.userAddingForm.controls[key].markAsDirty();
      });
    }
  }

  addStoreId() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      const currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.userAddingForm.patchValue({storeUid: currentStore['storeUid']});
    });
  }

  addAddedBy() {
    this.userDataSubscription = this.user$.subscribe((data) => {
      this.user = data.valueOf();
      this.userAddingForm.patchValue({createdBy: this.user.uid});
    });
  }

  selectRole(index) {
    this.userAddingForm.patchValue({role: this.roles[index]});
  }
}
