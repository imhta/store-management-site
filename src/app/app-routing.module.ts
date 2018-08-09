import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent},
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
