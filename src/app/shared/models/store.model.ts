import * as firebase from 'firebase/firestore';
import GeoPoint = firebase.firestore.GeoPoint;


export class UserStoreState {
  linkedStores: any[];
  selectedStore: number; // index of selected store in stores array
  constructor(data) {
    this.linkedStores = data.linkedStores;
    this.selectedStore = data.selectedStore;
  }
}


export class ShopRegistrationForm {
  registerUid: string;
  storeName: string;
  gstNumber: string;
  contactNo: string;
  typeOfStore: 'boutique' |
    'factory outlet' |
    'fashion retailer' |
    'footwear' |
    'fashion accessories' |
    'fashion designer' |
    'fashion brand';
  address: object;
  location: GeoPoint;
  locationAccuracy: number;
  locationTimeStamp: number;
  verificationStatus?: string;
  createdAt?: Date;
  uploads?: object;

  constructor() {

  }

  fromJson(data) {
    this.storeName = data.storeName;
    this.contactNo = data.contactNumber;
    this.address = data.address;
    this.registerUid = data.registerUid;
    this.gstNumber = data.gstNumber;
    this.typeOfStore = data.typeOfStore;
  }

  toJson() {
    return {
      'registerUid': this.registerUid,
      'storeName': this.storeName,
      'contactNo': this.contactNo,
      'typeOfStore': this.typeOfStore,
      'gstNumber': this.gstNumber,
      'address': this.address,
      'location': this.location,
      'locationTimeStamp': this.locationTimeStamp,
      'createdAt': new Date().toLocaleString(),
    };
  }

}

