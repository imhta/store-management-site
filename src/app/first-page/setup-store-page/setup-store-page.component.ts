import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserModel} from '../../shared/models/auth.model';
import {ShopRegistrationForm} from '../../shared/models/store.model';
import {Observable, Subscription} from 'rxjs';
import {FirestoreService} from '../../shared/service/firestore/firestore.service';
import {SetupNewStore} from '../../shared/actions/store.actions';
import {LoadingFalse, LoadingTrue} from '../../shared/state/loading.state';

@Component({
  selector: 'app-setup-store-page',
  templateUrl: './setup-store-page.component.html',
  styleUrls: ['./setup-store-page.component.css']
})
export class SetupStorePageComponent implements OnInit, OnDestroy {
  @Select('user') user$: Observable<object>;
  userDataSubscription: Subscription;
  user: UserModel;

  storeForm = this.fb.group({
    storeName: [''],
    contactNumber: [''],
    registerUid: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      pinCode: ['']
    }),
  });

  constructor(private fb: FormBuilder, private dbService: FirestoreService, private store: Store) {
  }

  ngOnInit() {
    this.userDataSubscription = this.user$.subscribe((data) => {this.user = data.valueOf();
      this.storeForm.patchValue({registerUid: this.user.uid});
    });

  }
  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

  onSubmit() {
    const store = new ShopRegistrationForm(this.storeForm.value);
    return this.store.dispatch([new LoadingTrue(), new SetupNewStore(store)]);
  }
}
