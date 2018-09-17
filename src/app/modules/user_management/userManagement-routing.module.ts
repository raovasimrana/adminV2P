import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { AppComponent } from '../../app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ModulesComponent } from '../modules.component';
import { LocalStorage } from '../../commons/services/localStorage.service';
import { Constants } from '../../../config/constant';

const role = localStorage.getItem('role');
const constants = Constants;
const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    // canActivate: [AuthGuard],
    children: [
      // Admin Routes
      {
        path: `product`,
        // canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `users`,
        // canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `order`,
        // canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `appointment`,
        // canActivate: [AdminGuard],
        component: AdminComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
