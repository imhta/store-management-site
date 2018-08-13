export class ShopRegistrationForm {
  email: string;
  ownerName: string;
  proprietorName:  string;
  ownerPassword: string;
  storeName:  string;
  contactNo:  string;
  panNo:  string;
  regNo: string;
  numberOfBranches:  string;
  address:  string;
  monthlyRevenue:  string;
  noOfWorkers:  string;
  noOfUsers:  string;
  verificationStatus?:  string;
  createdAt?:  Date;
  uploads?: object;

  constructor() {
    this.email = '';
    this.proprietorName =  '';
    this.ownerName = '';
    this.storeName =  '';
    this.contactNo =  '';
    this.panNo =  '';
    this.regNo = '';
    this.numberOfBranches =  '';
    this.address =  '';
    this.monthlyRevenue =  '';
    this.noOfWorkers =  '';
    this.noOfUsers =  '';
    this.ownerPassword = '';
  }
}
