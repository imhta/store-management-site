export interface Roles {
  store: boolean;
  customer?: boolean;
}

export class User {
  email:    string;
  displayName: string;
  photoUrl: string;
  roles:    Roles;
  loading: boolean;
  constructor(authData) {
    this.email    = authData.email;
    this.displayName     = authData.displayName;
    this.photoUrl = authData.photoURL;
    this.roles    = { store: true };
  }
  toJson() {
    return{
      'email': this.email,
      'displayName': this.displayName,
      'photoUrl': this.photoUrl,
      'roles': this.roles
    };
  }
}
