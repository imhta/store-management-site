import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
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
    storeName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{10}$')])],
    // contactNumber: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]{5,15}$')])],
    registerUid: ['', Validators.compose([Validators.required])],
    gstNumber: [
      '',
      Validators.compose([
        Validators
          .pattern('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
      ])
    ],
    hasNoGstNumber: [false, Validators.compose([Validators.required])],
    typeOfStore: ['fashion brand outlet', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    address: this.fb.group({
      street: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      state: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      pinCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])]
    }),
  });
  typeOfStores = [
    {value: 'fashion brand outlet', title: 'Fashion brand outlet'},
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
      map(term => term.length < 1 ? []
        : indianStates.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).reverse().slice(0, 10))
    );

  constructor(private fb: FormBuilder, private store: Store) {
  }

  get storeName() {
    return this.storeForm.get('storeName');
  }

  get mobileNumber() {
    return this.storeForm.get('mobileNumber');
  }

  get contactNumber() {
    return this.storeForm.get('contactNumber');
  }

  get gstNumber() {
    return this.storeForm.get('gstNumber');
  }

  get street() {
    return this.storeForm.get('address').get('street');
  }

  get city() {
    return this.storeForm.get('address').get('city');
  }

  get state() {
    return this.storeForm.get('address').get('state');
  }

  get pinCode() {
    return this.storeForm.get('address').get('pinCode');
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
    if (!this.gstNumber.touched && this.storeForm.get('hasNoGstNumber').value === false) {
      this.storeForm.patchValue({hasNoGstNumber: true});
    }
    if (this.storeForm.valid) {
      this._store.fromJson(this.storeForm.value);
      return this.store.dispatch([new LoadingTrue(), new SetupNewStore(this._store)]);
    } else {
      Object.keys(this.storeForm.controls).forEach(key => {
        this.storeForm.controls[key].markAsDirty();
      });
      this.street.markAsDirty();
      this.city.markAsDirty();
      this.state.markAsDirty();
      this.pinCode.markAsDirty();
    }
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
