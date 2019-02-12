import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserModel} from '../../shared/models/auth.model';
import {ShopRegistrationForm} from '../../shared/models/store.model';
import {Observable, Subscription} from 'rxjs';
import {SetupNewStore} from '../../shared/actions/store.actions';
import {LoadingTrue} from '../../shared/state/app-general.state';
import * as firebase from 'firebase';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {CustomValidator} from '../../shared/validators/custom.validator';
import {AngularFirestore} from '@angular/fire/firestore';
import {ErrorStateMatcher} from '@angular/material';
import {GetConfigService} from '../../shared/service/realtimedb-config/get-config.service';

const indianStates = ['Arunachal Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'];


/** Error when invalid control is dirty, touched, or submitted. */
export class TouchedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}

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
    storeName: ['', [Validators.required, Validators.minLength(5)]],
    usn: ['', [Validators.required, Validators.minLength(5)], CustomValidator.usn(this.afs)],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
    // contactNumber: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]{5,15}$')])],
    registerUid: ['', [Validators.required]],
    gstNumber: [
      '',
      [
        Validators
          .pattern('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
      ]
    ],
    hasNoGstNumber: [false, [Validators.required]],
    typeOfStore: ['fashion brand outlet', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
    }),
  });
  typeOfStores$: Observable<object>;
  TouchedMatcher = new TouchedErrorStateMatcher();
  filteredState$: Observable<string[]>;
  constructor(private fb: FormBuilder, private store: Store, private afs: AngularFirestore, private configService: GetConfigService) {

  }

  get storeName() {
    return this.storeForm.get('storeName');
  }

  get mobileNumber() {
    return this.storeForm.get('mobileNumber');
  }

  get usn() {
    return this.storeForm.get('usn');
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
    this.typeOfStores$ =  this.configService.getTypeOfStores()
      .pipe(
        map((data: object) => Object.entries(data).map(([key, value]) => ({key, value}))));
    this.filteredState$ = this.state.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : indianStates.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).reverse().slice(0, 10))
    );

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
