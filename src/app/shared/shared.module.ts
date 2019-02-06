import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogoComponent} from './components/logo/logo.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoadingComponent} from './components/loading/loading.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {QrScannerComponent} from './fun-components/qr-scanner/qr-scanner.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    LogoComponent,
    NavbarComponent,
    LoadingComponent,
    NotFoundPageComponent,

    // fun-components
    QrScannerComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    LogoComponent,
    NavbarComponent,
    LoadingComponent,
    NotFoundPageComponent,


    // fun-components
    QrScannerComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
