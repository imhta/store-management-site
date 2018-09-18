import {AuthService} from './shared/service/auth/auth.service';
import {LogoComponent} from './general-components/logo/logo.component';
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponent} from './routing-module/app-routing.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {environment} from '../environments/environment';
import {HomePageComponent} from './home-page/home-page.component';
import {NavbarComponent} from './general-components/navbar/navbar.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthGuard} from './shared/service/guard/auth/auth.guard';
import {NgxsModule} from '@ngxs/store';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {AuthState} from './shared/state/auth.state';
import {ManageStorePageComponent} from './first-page/manage-store-page/manage-store-page.component';
import {SetupStorePageComponent} from './first-page/setup-store-page/setup-store-page.component';
import {LinkedStoreComponent} from './first-page/linked-store/linked-store.component';
import {LoadingState} from './shared/state/loading.state';
import {FirestoreService} from './shared/service/firestore/firestore.service';
import {StoreState} from './shared/state/store.state';
import {LoadingComponent} from './general-components/loading/loading.component';
import {StorePageComponent} from './store-page/store-page.component';
import {AddProductPageComponent} from './add-product-page/add-product-page.component';
import {AllProductState} from './shared/state/allproduct.state';
// for qr code generation lib
import {NgxKjuaModule} from 'ngx-kjua';
// qr scanner module
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {ProductPageComponent} from './product-page/product-page.component';
import {QrPageComponent} from './qr-page/qr-page.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {AddUserComponent} from './manage-users/add-user/add-user.component';
import {SellPageComponent} from './sell-page/sell-page.component';
import {QrScannerComponent} from './general-components/qr-scanner/qr-scanner.component';
import {InvoicesState} from './shared/state/invoice.state';
import {InvoicePageComponent} from './invoice-page/invoice-page.component';
import {CustomerPageComponent} from './customer-page/customer-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {BillingPageComponent} from './billing-page/billing-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {PwaService} from './shared/service/pwa/pwa.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    LogoComponent,
    HomePageComponent,
    NavbarComponent,
    LoginPageComponent,
    ManageStorePageComponent,
    SetupStorePageComponent,
    LinkedStoreComponent,
    LoadingComponent,
    StorePageComponent,
    AddProductPageComponent,
    ProductPageComponent,
    QrPageComponent,
    ManageUsersComponent,
    AddUserComponent,
    SellPageComponent,
    QrScannerComponent,
    InvoicePageComponent,
    CustomerPageComponent,
    DashboardPageComponent,
    BillingPageComponent,



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxsModule.forRoot([AuthState, LoadingState, StoreState, AllProductState, InvoicesState]),
    NgxsRouterPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxKjuaModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

  ],
  exports: [],
  providers: [AuthService, AuthGuard, FirestoreService, PwaService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
