import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementRoutingModule } from './userManagement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import {DataTableModule} from 'angular2-datatable';
import { ModulesComponent } from '../modules.component';
import { AdminService } from './components/admin/admin.service';
import { ApplicationPipesModule } from '../../commons/pipes/pipes.module';
import { UserManagementService } from './user-management.service';
@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    NgbModule,
    UserManagementRoutingModule,
    DataTableModule,
    FormsModule,
    ApplicationPipesModule,
  ],
  providers: [AdminService, UserManagementService],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class UserManagementModule { }
