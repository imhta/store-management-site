
import {AuthService} from './shared/service/auth/auth.service';
import {LogoComponent} from './general-components/logo/logo.component';
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponent} from './shared/routing-module/app-routing.module';
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
import {AddProductPageComponent} from './add-page/add-product-page/add-product-page.component';
import {AllProductState} from './shared/state/allproduct.state';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
// for qr code generation lib
import {NgxKjuaModule} from 'ngx-kjua';
// qr scanner module
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {ProductPageComponent} from './product-page/product-page.component';
import {QrPageComponent} from './qr-page/qr-page.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {AddUserComponent} from './manage-users/add-user/add-user.component';
import {SalesPageComponent} from './sales-page/sales-page.component';
import {QrScannerComponent} from './general-components/qr-scanner/qr-scanner.component';
import {InvoicesState} from './shared/state/invoice.state';
import {InvoicePageComponent} from './invoice-page/invoice-page.component';
import {CustomerPageComponent} from './customer-page/customer-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {BillingPageComponent} from './billing-page/billing-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {PwaService} from './shared/service/pwa/pwa.service';
import {RegisterGuard} from './shared/service/guard/role/register-guard/register-guard';
import {SellingGuard} from './shared/service/guard/feature-guard/selling-guard/selling.guard';
import {AddProductGuard} from './shared/service/guard/feature-guard/add-product-guard/add-product.guard';
import {ManagerGuard} from './shared/service/guard/role/manager-guard/manager.guard';
import {StoreCreatorGuard} from './shared/service/guard/feature-guard/store-creator-guard/store-creator.guard';
import {FileUploadComponent} from './add-page/add-product-page/file-upload/file-upload.component';
import {StoreResolver} from './shared/service/resolver/store.resolver';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreSettingsComponent} from './store-settings/store-settings.component';
import {LogoUploadComponent} from './store-settings/logo-upload/logo-upload.component';
import {StorePicsUploadComponent} from './store-settings/store-pics-upload/store-pics-upload.component';
import {NotFoundPageComponent} from './general-components/not-found-page/not-found-page.component';
import {ReturnProductsComponent} from './sales-page/return-products/return-products.component';
import {AddPageComponent} from './add-page/add-page.component';
import {DiscountsManagerComponent} from './add-page/discounts-manager/discounts-manager.component';
import {StoreTableViewComponent} from './store-page/store-table-view/store-table-view.component';
import {StoreGridViewComponent} from './store-page/store-grid-view/store-grid-view.component';
// material module
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {HttpService} from './shared/service/http/http.service';
import {PipesModule} from './shared/pipes/pipes.module';
import {CommonModule} from '@angular/common';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

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
    SalesPageComponent,
    QrScannerComponent,
    InvoicePageComponent,
    CustomerPageComponent,
    DashboardPageComponent,
    BillingPageComponent,
    FileUploadComponent,
    StoreSettingsComponent,
    LogoUploadComponent,
    StorePicsUploadComponent,
    NotFoundPageComponent,
    ReturnProductsComponent,
    AddPageComponent,
    DiscountsManagerComponent,
    StoreTableViewComponent,
    StoreGridViewComponent,
  ],
  imports: [
    CommonModule,
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
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxsModule.forRoot([AuthState, LoadingState, StoreState, AllProductState, InvoicesState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxKjuaModule,
    ZXingScannerModule,
    NgbModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    PipesModule

  ],
  exports: [],
  providers: [
    AuthService,
    FirestoreService,
    HttpService,
    AuthGuard,
    PwaService,
    RegisterGuard,
    ManagerGuard,
    SellingGuard,
    AddProductGuard,
    StoreCreatorGuard,
    StoreResolver
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
