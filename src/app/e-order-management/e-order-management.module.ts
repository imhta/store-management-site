import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EOrderManagementRoutingModule } from './e-order-management-routing.module';
import { EOrderManagementComponent } from './e-order-management/e-order-management.component';

@NgModule({
  declarations: [EOrderManagementComponent],
  imports: [
    CommonModule,
    EOrderManagementRoutingModule
  ]
})
export class EOrderManagementModule { }
