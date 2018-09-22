import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserModel} from '../../shared/models/auth.model';
import {ShopRegistrationForm} from '../../shared/models/store.model';
import {Observable, Subscription} from 'rxjs';
import {FirestoreService} from '../../shared/service/firestore/firestore.service';
import {SetupNewStore} from '../../shared/actions/store.actions';
import {LoadingTrue} from '../../shared/state/loading.state';

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
    geoLocation: this.fb.group({
      lat: [''],
      long: [''],
      accuracy: [''],
      timeStamp: ['']
    })
  });

  constructor(private fb: FormBuilder, private dbService: FirestoreService, private store: Store) {
    this.getGeoLocation();
  }

  ngOnInit() {
    this.userDataSubscription = this.user$.subscribe((data) => {
      this.user = data.valueOf();
      this.storeForm.patchValue({registerUid: this.user.uid});
    });

  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

  onSubmit() {
    this.getGeoLocation();
    const store = new ShopRegistrationForm(this.storeForm.value);
    return this.store.dispatch([new LoadingTrue(), new SetupNewStore(store)]);
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('Geo location not supported');
    }
  }

  showPosition(position) {
    this.storeForm.patchValue({
      geoLocation: {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timeStamp: position.timestamp
      }
    });
    console.log(position.coords.latitude, position.coords.longitude, position.coords.accuracy, position.timestamp);
  }
}
