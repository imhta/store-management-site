import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './routing-module/app-routing.module';
// firebase
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';

// environment
import {environment} from '../environments/environment';


import {AuthGuard} from './shared/service/guard/auth/auth.guard';
import {NgxsModule} from '@ngxs/store';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {AuthState} from './shared/state/auth.state';

import {AppGeneralState} from './shared/state/app-general.state';
import {FirestoreService} from './shared/service/firestore/firestore.service';
import {StoreState} from './shared/state/store.state';

import {AllProductState} from './shared/state/allproduct.state';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {InvoicesState} from './shared/state/invoice.state';
import {PwaService} from './shared/service/pwa/pwa.service';
import {RegisterGuard} from './shared/service/guard/role/register-guard/register-guard';
import {SellingGuard} from './shared/service/guard/feature-guard/selling-guard/selling.guard';
import {AddProductGuard} from './shared/service/guard/feature-guard/add-product-guard/add-product.guard';
import {ManagerGuard} from './shared/service/guard/role/manager-guard/manager.guard';
import {StoreCreatorGuard} from './shared/service/guard/feature-guard/store-creator-guard/store-creator.guard';

import {StoreResolver} from './shared/service/resolver/store.resolver';


import {HttpService} from './shared/service/http/http.service';
import {PipesModule} from './shared/pipes/pipes.module';
import {CommonModule} from '@angular/common';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {SharedModule} from './shared/shared.module';
import {CustomValidator} from './shared/validators/custom.validator';
import { AuthCheckLoadingPageComponent } from './auth-check-loading-page/auth-check-loading-page.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material';
import {AngularFireDatabaseModule} from '@angular/fire/database';


const rootState = [
  AuthState,
  AppGeneralState,
  StoreState,
  AllProductState,
  InvoicesState
];
@NgModule({
  declarations: [
    AppComponent,
    AuthCheckLoadingPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgxsModule.forRoot(rootState, {developmentMode: !environment.production}),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    // ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    PipesModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  exports: [],
  providers: [
    {provide: FirestoreSettingsToken, useValue: {}},
    FirestoreService,
    AuthGuard,
    PwaService,
    HttpService,
    RegisterGuard,
    ManagerGuard,
    SellingGuard,
    AddProductGuard,
    StoreCreatorGuard,
    StoreResolver,
    CustomValidator
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
