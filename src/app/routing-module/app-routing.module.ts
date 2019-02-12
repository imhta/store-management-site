import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/service/guard/auth/auth.guard';
import {StorePageComponent} from '../store-page/store-page.component';
import {ProductPageComponent} from '../product-page/product-page.component';
import {QrPageComponent} from '../qr-page/qr-page.component';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {AddUserComponent} from '../manage-users/add-user/add-user.component';
import {RegisterGuard} from '../shared/service/guard/role/register-guard/register-guard';
import {SalesPageComponent} from '../sales-page/sales-page.component';
import {InvoicePageComponent} from '../invoice-page/invoice-page.component';
import {CustomerPageComponent} from '../customer-page/customer-page.component';
import {DashboardPageComponent} from '../dashboard-page/dashboard-page.component';
import {BillingPageComponent} from '../billing-page/billing-page.component';
import {SellingGuard} from '../shared/service/guard/feature-guard/selling-guard/selling.guard';
import {StoreSettingsComponent} from '../store-settings/store-settings.component';
import {NotFoundPageComponent} from '../shared/components/not-found-page/not-found-page.component';
import {AddPageComponent} from '../add-page/add-page.component';
import {AuthCheckLoadingPageComponent} from '../auth-check-loading-page/auth-check-loading-page.component';


const routes: Routes = [
  {
    path: '',
    component: AuthCheckLoadingPageComponent
  },
  {
    path: 'go',
    loadChildren: '../home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: '../login/login.module#LoginModule'
  },
  {
    path: 'authenticated',
    redirectTo: 'go',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'check',
    component: AuthCheckLoadingPageComponent
  },


  {
    path: '**',
    component: NotFoundPageComponent
  }
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

