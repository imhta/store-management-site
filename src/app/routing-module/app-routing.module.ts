import {LoginPageComponent} from '../login/login-page/login-page.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/service/guard/auth/auth.guard';
import {SetupStorePageComponent} from '../home/setup-store-page/setup-store-page.component';
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
import {StoreCreatorGuard} from '../shared/service/guard/feature-guard/store-creator-guard/store-creator.guard';
import {StoreResolver} from '../shared/service/resolver/store.resolver';
import {StoreSettingsComponent} from '../store-settings/store-settings.component';
import {NotFoundPageComponent} from '../shared/components/not-found-page/not-found-page.component';
import {AddPageComponent} from '../add-page/add-page.component';
import {LinkedStoreComponent} from '../home/linked-store/linked-store.component';


const routes: Routes = [

  {
    path: '',
    component: LoginPageComponent,
    canDeactivate: [AuthGuard]
  },
  {
    path: 'authenticated',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: LinkedStoreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'setup/store',
    component: SetupStorePageComponent,
    canActivate: [AuthGuard, StoreCreatorGuard]
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

