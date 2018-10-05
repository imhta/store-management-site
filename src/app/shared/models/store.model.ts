import * as firebase from 'firebase/firestore';
import GeoPoint = firebase.firestore.GeoPoint;


export class UserStoreState {
  linkedStores: any[];
  selectedStore: number; // index of selected store in stores array
  constructor(data) {
    this.linkedStores =  data.linkedStores;
    this.selectedStore = data.selectedStore;
  }
}


export class ShopRegistrationForm {
  registerUid: string;
  storeName: string;
  gstNumber: string;
  contactNo: string;
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

  }

  toJson() {
    return {
      'registerUid': this.registerUid,
      'storeName': this.storeName,
      'contactNo': this.contactNo,
      'gstNumber': this.gstNumber,
      'address': this.address,
      'location': this.location,
      'locationTimeStamp': this.locationTimeStamp,
      'createdAt': new Date().toLocaleString(),
    };
  }

}

const indianStates = ['Arunachal Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Lakshadweep',
  'National Capital Territory of Delhi',
  'Puducherry'];
