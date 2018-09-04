import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {AuthGuard} from './shared/service/guard/auth.guard';
import {ManageStorePageComponent} from './manage-store-page/manage-store-page.component';
import {SetupStorePageComponent} from './setup-store-page/setup-store-page.component';



const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'select/store', component: ManageStorePageComponent, canActivate: [AuthGuard]},
  {path: 'store/setup', component: SetupStorePageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
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
