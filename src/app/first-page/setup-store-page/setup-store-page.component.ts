import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserModel} from '../../shared/models/auth.model';
import {ShopRegistrationForm} from '../../shared/models/store.model';
import {Observable, Subscription} from 'rxjs';
import {SetupNewStore} from '../../shared/actions/store.actions';
import {LoadingTrue} from '../../shared/state/loading.state';
import * as firebase from 'firebase';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

const indianStates = ['Arunachal Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'National Capital Territory of Delhi', 'Puducherry'];

@Component({
  selector: 'app-setup-store-page',
  templateUrl: './setup-store-page.component.html',
  styleUrls: ['./setup-store-page.component.css']
})
export class SetupStorePageComponent implements OnInit, OnDestroy {
  @Select('user') user$: Observable<object>;
  userDataSubscription: Subscription;
  user: UserModel;
  isLocated = false;
  _store = new ShopRegistrationForm();
  storeForm = this.fb.group({
    storeName: [''],
    contactNumber: [''],
    registerUid: [''],
    gstNumber: [''],
    typeOfStore: ['fashion brand'],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      pinCode: ['']
    }),
  });
  typeOfStores = [
    {value: 'fashion brand', title: 'Fashion brand'},
    {value: 'factory outlet', title: 'Fashion outlet'},
    {value: 'fashion retailer', title: 'Fashion retailer'},
    {value: 'fashion designer', title: 'Fashion designer'},
    {value: 'boutique', title: 'Boutique'},
    {value: 'fashion accessories', title: 'Fashion accessories'},
    {value: 'footwear', title: 'Footwear'},

  ];
  stateSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : indianStates.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  constructor(private fb: FormBuilder, private store: Store) {
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
    this._store.fromJson(this.storeForm.value);
    return this.store.dispatch([new LoadingTrue(), new SetupNewStore(this._store)]);
  }

  locateStore() {
    this.getGeoLocation().then(() => {
      this.isLocated = true;
    });
  }

  getGeoLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this._store.location = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
            this._store.locationAccuracy = position.coords.accuracy;
            this._store.locationTimeStamp = position.timestamp;
            console.log(this._store.location, this._store.locationTimeStamp);
            resolve();
          },
          (err) => {
            alert('Please enable your GPS position future.');
            reject();
          }, {maximumAge: 1, timeout: 10000, enableHighAccuracy: true}
        );
      } else {
        console.log('Geo location not supported');
        reject();
      }


    });
  }
}
