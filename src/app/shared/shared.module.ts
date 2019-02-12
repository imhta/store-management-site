import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogoComponent} from './components/logo/logo.component';
import {LoadingComponent} from './components/loading/loading.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {QrScannerComponent} from './fun-components/qr-scanner/qr-scanner.component';
import {MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import { FirestorageUploadComponent } from './fun-components/firestorage-upload/firestorage-upload.component';

@NgModule({
  declarations: [
    LogoComponent,
    LoadingComponent,
    NotFoundPageComponent,

    // fun-components
    QrScannerComponent,

    FirestorageUploadComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    LogoComponent,
    LoadingComponent,
    NotFoundPageComponent,


    // fun-components
    QrScannerComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class SharedModule { }
