import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetupStorePageComponent} from './setup-store-page/setup-store-page.component';
import {LinkedStoreComponent} from './linked-store/linked-store.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import {NavbarComponent} from './home/navbar/navbar.component';
import {StorePageComponent} from '../store-page/store-page.component';
import {AddProductPageComponent} from '../add-page/add-product-page/add-product-page.component';
import {ProductPageComponent} from '../product-page/product-page.component';
import {QrPageComponent} from '../qr-page/qr-page.component';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {AddUserComponent} from '../manage-users/add-user/add-user.component';
import {SalesPageComponent} from '../sales-page/sales-page.component';
import {InvoicePageComponent} from '../invoice-page/invoice-page.component';
import {CustomerPageComponent} from '../customer-page/customer-page.component';
import {DashboardPageComponent} from '../dashboard-page/dashboard-page.component';
import {BillingPageComponent} from '../billing-page/billing-page.component';
import {FileUploadComponent} from '../add-page/add-product-page/file-upload/file-upload.component';
import {StoreSettingsComponent} from '../store-settings/store-settings.component';
import {LogoUploadComponent} from '../store-settings/logo-upload/logo-upload.component';
import {StorePicsUploadComponent} from '../store-settings/store-pics-upload/store-pics-upload.component';
import {ReturnProductsComponent} from '../sales-page/return-products/return-products.component';
import {AddPageComponent} from '../add-page/add-page.component';
import {DiscountsManagerComponent} from '../add-page/discounts-manager/discounts-manager.component';
import {StoreTableViewComponent} from '../store-page/store-table-view/store-table-view.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NgxKjuaModule} from 'ngx-kjua';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '@angular/cdk/layout';
import { UniversalMicroAddDialogComponent } from './dialogs/universal-micro-add-dialog/universal-micro-add-dialog.component';
import {UniversalMicroAddService} from './services/universal-micro-add/universal-micro-add.service';



@NgModule({
  declarations: [
    SetupStorePageComponent,
    LinkedStoreComponent,
    HomeComponent,
    NavbarComponent,
    StorePageComponent,
    AddProductPageComponent,
    ProductPageComponent,
    QrPageComponent,
    ManageUsersComponent,
    AddUserComponent,
    SalesPageComponent,
    InvoicePageComponent,
    CustomerPageComponent,
    DashboardPageComponent,
    BillingPageComponent,
    FileUploadComponent,
    StoreSettingsComponent,
    LogoUploadComponent,
    StorePicsUploadComponent,
    ReturnProductsComponent,
    AddPageComponent,
    DiscountsManagerComponent,
    StoreTableViewComponent,
    UniversalMicroAddDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // material imports
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,

    LayoutModule,
    NgxKjuaModule,
    ZXingScannerModule,
    NgbModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SharedModule,
    HomeRoutingModule
  ],
  entryComponents: [UniversalMicroAddDialogComponent,],
  exports: [],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    UniversalMicroAddService
  ]
})
export class HomeModule {
}
