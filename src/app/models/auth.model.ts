export enum Roles {
  Unknown,
  Store
}



export class User {
  email:    string;
  uid: string;
  displayName: string;
  photoUrl: string;
  roles:    Roles;

  constructor(authData) {
    this.email    = authData.email;
    this.displayName     = authData.displayName;
    this.photoUrl = authData.photoURL;
    this.uid = authData.uid;
    this.roles    =  Roles.Store;
  }
  toJson() {
    return{
      'email': this.email,
      'displayName': this.displayName,
      'photoUrl': this.photoUrl,
      'uid': this.uid,
      'roles': this.roles
    };
  }
}
export interface  UserModel {
  email?:    string;
  uid?: string;
  displayNam?: string;
  photoUrl?: string;
  roles:    Roles;
}
