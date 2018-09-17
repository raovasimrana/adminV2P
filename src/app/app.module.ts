import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppMaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { UserManagementModule } from './modules/user_management/userManagement.module';
import { AuthGuard } from './account/auth/guard/auth.guard';
import { AdminGuard } from './account/auth/guard/admin.guard';
import { LocalStorage } from './commons/services/localStorage.service';
import { HttpService } from './commons/services/http.service';
import { CustomValidationService } from './commons/services/custom-validation.service';
import { ModulesModule } from './modules/modules.module';
import './rxjs-operators';
import { AddUserDialogAdminComponent } from './commons/dialogs/add-user-dialog-admin/add-user-dialog-admin.component';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { LoaderService } from './commons/services/loader.service';
import { ConfirmDialogComponent } from './commons/dialogs/confirm-dialog/confirm-dialog.component';
import { ViewDocumentComponent } from './commons/dialogs/view-document/view-document.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    AddUserDialogAdminComponent,
    ConfirmDialogComponent,
    ViewDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgbModule.forRoot(),
    AccountModule,
    ModulesModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ToasterModule.forRoot(),
  ],
  providers: [{ provide: LocalStorage, useValue: 'test' }, AuthGuard, AdminGuard, ToasterService, LoaderService, CustomValidationService],
  entryComponents: [AddUserDialogAdminComponent, ConfirmDialogComponent, ViewDocumentComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
