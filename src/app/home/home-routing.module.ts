import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinkedStoreComponent} from './linked-store/linked-store.component';
import {HomeComponent} from './home/home.component';
import {SetupStorePageComponent} from './setup-store-page/setup-store-page.component';
import {DashboardPageComponent} from '../dashboard-page/dashboard-page.component';
import {AuthGuard} from '../shared/service/guard/auth/auth.guard';
import {RegisterGuard} from '../shared/service/guard/role/register-guard/register-guard';
import {StorePageComponent} from '../store-page/store-page.component';
import {StoreSettingsComponent} from '../store-settings/store-settings.component';
import {SalesPageComponent} from '../sales-page/sales-page.component';
import {SellingGuard} from '../shared/service/guard/feature-guard/selling-guard/selling.guard';
import {BillingPageComponent} from '../billing-page/billing-page.component';
import {AddPageComponent} from '../add-page/add-page.component';
import {InvoicePageComponent} from '../invoice-page/invoice-page.component';
import {CustomerPageComponent} from '../customer-page/customer-page.component';
import {ProductPageComponent} from '../product-page/product-page.component';
import {QrPageComponent} from '../qr-page/qr-page.component';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {AddUserComponent} from '../manage-users/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LinkedStoreComponent
      },
      {
        path: 'setup/store',
        component: SetupStorePageComponent
      },
      {
        path: 'u/:id',
        children: [
          {
            path: '',
            redirectTo: 'store',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard, RegisterGuard]
          },
          {
            path: 'store',
            canActivate: [AuthGuard],
            // resolve: {getAllProducts: StoreResolver},
            children: [
              {
                path: '',
                component: StorePageComponent
              },
              {
                path: 'profile',
                component: StoreSettingsComponent,
                canActivate: [AuthGuard, RegisterGuard]
              }
            ]
          },
          {
            path: 'sales',
            component: SalesPageComponent,
            canActivate: [AuthGuard, SellingGuard]
          },
          {
            path: 'billing',
            component: BillingPageComponent,
            canActivate: [AuthGuard, RegisterGuard]
          },
          {
            path: 'add',
            component: AddPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'invoice',
            component: InvoicePageComponent,
            canActivate: [AuthGuard, SellingGuard]
          },
          {
            path: 'customers',
            component: CustomerPageComponent,
            canActivate: [AuthGuard, SellingGuard]
          },
          {
            path: 'store/product',
            component: ProductPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'generated/qr',
            component: QrPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'manage/users',
            component: ManageUsersComponent,
            canActivate: [AuthGuard, RegisterGuard]
          },
          {
            path: 'add/user',
            component: AddUserComponent,
            canActivate: [AuthGuard, RegisterGuard]
          }
        ]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
