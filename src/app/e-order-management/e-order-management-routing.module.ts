import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EOrderManagementComponent} from './e-order-management/e-order-management.component';

const routes: Routes = [
  {
    path: '',
    component: EOrderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EOrderManagementRoutingModule { }
