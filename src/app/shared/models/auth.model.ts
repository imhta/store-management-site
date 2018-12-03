export class LoginModel {
  email: string;
  uid: string;
  displayName: string;
  photoUrl: string;
  token: string;


  constructor(authData) {
    this.email = authData.user.email;
    this.displayName = authData.user.displayName;
    this.photoUrl = authData.user.photoURL;
    this.uid = authData.user.uid;
    this.token = authData.credential.accessToken;
  }

  toJson() {
    return {
      'email': this.email,
      'displayName': this.displayName,
      'photoUrl': this.photoUrl,
      'uid': this.uid,
      'token': this.token,
    };
  }
}

export interface UserModel {
  email?: string;
  uid?: string;
  displayName?: string;
  photoUrl?: string;
  token?: string;
  isRegister?: boolean;
  registerOf?: string[];
  isEmployee?: boolean;
  employeeOf?: string[];
  createdOn?: Date;
  createdBy?: string;
  role?: 'Data entry' | 'Manager' | 'Billing' | 'Register';
}

export class ExtraUser {
  email: string;
  isEmployee: boolean;
  employeeOf = [];
  createdOn: Date = new Date();
  createdBy: string;
  role: 'Data entry' | 'Manager' | 'Billing' | 'Register';

  constructor(data) {
    this.email = data.email;
    this.role = data.role;
    this.createdBy = data.createdBy;
    this.employeeOf.push(data.storeUid);
    this.isEmployee = true;
  }

  toJson() {
    return {
      'email': this.email,
      'role': this.role,
      'isEmployee': this.isEmployee,
      'employeeOf': this.employeeOf,
      'createdOn': this.createdOn,
      'createdBy': this.createdBy
    };
  }
}

export class User {
  email?: string;
  uid?: string;
  displayName?: string;
  photoUrl?: string;
  token?: string;
  isRegister?: boolean;
  registerOf: string[];
  isEmployee?: boolean;
  employeeOf?: string[];
  createdOn?: Date;
  createdBy?: string;
  role?: 'Data entry' | 'Manager' | 'Billing' | 'Register';

  constructor(data) {
    this.email = data['email'];
    this.uid = data['uid'];
    this.displayName = data['displayName'];
    this.photoUrl = data['photoUrl'];
    this.token = data['token'];
    // conditional data
    this.isRegister = data['isRegister'] ? data['isRegister'] : null ;
    this.registerOf = data['registerOf'] ?  data['registerOf'] : null;
    this.isEmployee = data['isEmployee'] ? data['isEmployee'] : null;
    this.employeeOf = data['employeeOf'] ? data['employeeOf'] : null;
    this.createdOn = data['createdOn'] ? data['createdOn'] : null;
    this.createdBy = data['createdBy'] ? data['createdBy'] : null;
    this.role = data['role'] ? data['role'] : null;
  }
}
