import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {AuthService} from './service/auth/auth.service';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ],
  exports: [],
  providers: [
    AuthService
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginModule {
}
