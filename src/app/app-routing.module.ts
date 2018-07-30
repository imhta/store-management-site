import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: LoginPageComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
// tslint:disable-next-line:eofline
export const routingComponent = [LoginPageComponent]
