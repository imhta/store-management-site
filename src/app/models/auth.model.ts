export class User {
  email:    string;
  uid: string;
  displayName: string;
  photoUrl: string;
  token: string;
  role:    'unknown' | 'store';

  constructor(authData) {
    this.email    = authData.user.email;
    this.displayName     = authData.user.displayName;
    this.photoUrl = authData.user.photoURL;
    this.uid = authData.user.uid;
    this.token = authData.credential.accessToken;
    this.role    =  'store';
  }
  toJson() {
    return{
      'email': this.email,
      'displayName': this.displayName,
      'photoUrl': this.photoUrl,
      'uid': this.uid,
      'token': this.token,
      'role': this.role
    };
  }
}
export interface  UserModel {
  email?:    string;
  uid?: string;
  displayNam?: string;
  photoUrl?: string;
  token?: string;
  role?:   'unknown' | 'store';
}
