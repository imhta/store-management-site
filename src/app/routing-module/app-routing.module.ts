import { LoginPageComponent } from '../login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import {AuthGuard} from '../shared/service/guard/auth/auth.guard';
import {ManageStorePageComponent} from '../first-page/manage-store-page/manage-store-page.component';
import {SetupStorePageComponent} from '../first-page/setup-store-page/setup-store-page.component';
import {StorePageComponent} from '../store-page/store-page.component';
import {AddProductPageComponent} from '../add-product-page/add-product-page.component';
import {ProductPageComponent} from '../product-page/product-page.component';
import {QrPageComponent} from '../qr-page/qr-page.component';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {AddUserComponent} from '../add-user/add-user.component';



const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'select/store', component: ManageStorePageComponent, canActivate: [AuthGuard]},
  {path: 'store/setup', component: SetupStorePageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'store', component: StorePageComponent, canActivate: [AuthGuard]},
  {path: 'add/product', component: AddProductPageComponent, canActivate: [AuthGuard]},
  {path: 'store/product', component: ProductPageComponent, canActivate: [AuthGuard]},
  {path: 'generated/qr', component: QrPageComponent, canActivate: [AuthGuard]},
  {path: 'manage/users', component: ManageUsersComponent, canActivate: [AuthGuard]},
  {path: 'add/user', component: AddUserComponent, canActivate: [AuthGuard]},
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
export class AppRoutingModule { }

export const routingComponent = [ HomePageComponent];
