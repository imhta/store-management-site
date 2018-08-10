import { AuthService } from './service/auth/auth.service';
import { LogoComponent } from './logo/logo.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {AuthGuard} from './service/guard/auth.guard';
import {NgxsModule, Store} from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';​
import {AuthState} from './shared/state/auth.state';
import {CheckAuthState} from './shared/actions/auth.actions';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    LogoComponent,
    HomePageComponent,
    NavbarComponent,
    LoginPageComponent


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxsModule.forRoot([AuthState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()

  ],
  exports: [],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(private  store: Store) {
    this.store.dispatch(new CheckAuthState());
  }
}
