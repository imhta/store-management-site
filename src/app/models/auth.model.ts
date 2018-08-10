

export class User {
  email:    string;
  uid: string;
  displayName: string;
  photoUrl: string;
  role:    'unknown' | 'store';

  constructor(authData) {
    this.email    = authData.email;
    this.displayName     = authData.displayName;
    this.photoUrl = authData.photoURL;
    this.uid = authData.uid;
    this.role    =  'store';
  }
  toJson() {
    return{
      'email': this.email,
      'displayName': this.displayName,
      'photoUrl': this.photoUrl,
      'uid': this.uid,
      'role': this.role
    };
  }
}
export interface  UserModel {
  email?:    string;
  uid?: string;
  displayNam?: string;
  photoUrl?: string;
  role:   'unknown' | 'store';
}
