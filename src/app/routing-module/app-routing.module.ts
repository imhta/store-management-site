import {LoginPageComponent} from '../login-page/login-page.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '../home-page/home-page.component';
import {AuthGuard} from '../shared/service/guard/auth/auth.guard';
import {ManageStorePageComponent} from '../first-page/manage-store-page/manage-store-page.component';
import {SetupStorePageComponent} from '../first-page/setup-store-page/setup-store-page.component';
import {StorePageComponent} from '../store-page/store-page.component';
import {AddProductPageComponent} from '../add-product-page/add-product-page.component';
import {ProductPageComponent} from '../product-page/product-page.component';
import {QrPageComponent} from '../qr-page/qr-page.component';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {AddUserComponent} from '../manage-users/add-user/add-user.component';
import {RegisterGuard} from '../shared/service/guard/role/register-guard/register-guard';
import {SellPageComponent} from '../sell-page/sell-page.component';
import {InvoicePageComponent} from '../invoice-page/invoice-page.component';
import {CustomerPageComponent} from '../customer-page/customer-page.component';
import {DashboardPageComponent} from '../dashboard-page/dashboard-page.component';
import {BillingPageComponent} from '../billing-page/billing-page.component';
import {SellingGuard} from '../shared/service/guard/feature-guard/selling-guard/selling.guard';
import {StoreCreatorGuard} from '../shared/service/guard/feature-guard/store-creator-guard/store-creator.guard';


const routes: Routes = [

  {path: '', component: LoginPageComponent},
  {path: 'select/store', component: ManageStorePageComponent, canActivate: [AuthGuard]},
  {path: 'store/setup', component: SetupStorePageComponent, canActivate: [AuthGuard, StoreCreatorGuard]},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'store', component: StorePageComponent, canActivate: [AuthGuard]},
  {path: 'sell', component: SellPageComponent, canActivate: [AuthGuard, SellingGuard]},
  {path: 'billing', component: BillingPageComponent, canActivate: [AuthGuard, RegisterGuard]},
  {path: 'add/product', component: AddProductPageComponent, canActivate: [AuthGuard]},
  {path: 'invoice', component: InvoicePageComponent, canActivate: [AuthGuard, SellingGuard]},
  {path: 'customers', component: CustomerPageComponent, canActivate: [AuthGuard, SellingGuard]},
  {path: 'store/product', component: ProductPageComponent, canActivate: [AuthGuard]},
  {path: 'generated/qr', component: QrPageComponent, canActivate: [AuthGuard]},
  {path: 'manage/users', component: ManageUsersComponent, canActivate: [AuthGuard, RegisterGuard]},
  {path: 'add/user', component: AddUserComponent, canActivate: [AuthGuard, RegisterGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),


  ],
  exports: [
    RouterModule,


  ],
  declarations: []
})
export class AppRoutingModule {
}

export const routingComponent = [HomePageComponent];
