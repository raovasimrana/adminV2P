import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddUserDialogAdminComponent } from '../../../../commons/dialogs/add-user-dialog-admin/add-user-dialog-admin.component';
import { ConfirmDialogComponent } from '../../../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { Constants } from '../../../../../config/constant';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../../../../commons/services/loader.service';
import { ToasterService } from 'angular2-toaster';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import * as _ from 'lodash';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'tm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  temp: any;
  croData: any;
  piData: any;
  regulatoryBodyData: any;
  sponsorData: any;
  currentTabIndex = 0;
  searchFilter: string;
  public constants = Constants;
  public adminFilter: any;
  public sponsorFilter: any;
  public sortType: string;
  public siteCoordinator = true;
  public irb = true;
  public url: string;
  public userType: string = this.constants.sponsorId;
  public userList: any = [];
  public productList: any = [];
  public croList: any = [];
  public piList: any = [];
  public croOrganisationList: any = [];
  public filteredData: any = [];

  @ViewChild('t') tab: MatTabGroup;
  public arrayOne(n: number): any[] {
    n = 9 - n;
    return Array(n);
  }
  constructor(public dialog: MatDialog,
    public router: Router,
    public adminService: AdminService,
    public loaderService: LoaderService,
    public toasterService: ToasterService,
    config: NgbTooltipConfig) {
    config.placement = 'right';
    config.triggers = 'click';
  }

  ngOnInit() {

    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#eff3f6';
    this.url = this.router.url;
    const index = this.url.lastIndexOf('/');
    this.url = this.url.slice(index + 1, this.url.length);
    switch (this.url) {
      case 'product': this.getUserList('product'); break;
      case 'users': this.getUserList('users'); break;
    }
    // this.getUserList(this.userType);

  }

  getUserList(type) {
    this.loaderService.display(true);
    switch (type) {
      case 'product': {
        this.adminService.getProdctList().subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          this.productList = data.data;
          this.filteredData = Object.assign([], this.productList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
      case 'users': {
        this.adminService.getUsersList().subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          this.userList = data;
          this.filteredData = Object.assign([], this.userList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
    }

  }
  changeOrder(data): void {
    this.sortType = data;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogAdminComponent, {
      width: '700px',
      data: { url: this.url }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.display(true);
        this.adminService.saveUsers(result).subscribe((success) => {
          this.loaderService.display(false);
          this.toasterService.pop('success', 'User Added Successfully')
          console.log(success);
          this.getUserList(this.url);;
        }),
          (error) => {
            console.log(error);
            this.loaderService.display(false);

          }
      }
    });

  }

  editUser(data) {
    console.log("data", data);
    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      userType: data.userType,
      address: data.address
    }
    const dialogRef = this.dialog.open(AddUserDialogAdminComponent, {
      width: '700px',
      data: { url: this.url, data: userData }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.loaderService.display(true);
        this.adminService.editUser(data.phone, result).subscribe((success) => {
          this.loaderService.display(false);
          this.toasterService.pop('success', 'User Added Successfully')
          console.log(success);
          this.getUserList(this.url);;
        }),
          (error) => {
            console.log(error);
            this.loaderService.display(false);

          }
      }
    });
  }
  editProduct(data) {
    const userData = {
      productName: data.productName,
      price: data.price,
      description: data.description,
      content: data.contents
    }
    const dialogRef = this.dialog.open(AddUserDialogAdminComponent, {
      width: '700px',
      data: { url: this.url, data: userData }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.loaderService.display(true);
        this.adminService.editProduct(data.phone, result).subscribe((success) => {
          this.loaderService.display(false);
          this.toasterService.pop('success', 'User Added Successfully')
          console.log(success);
          this.getUserList(this.url);;
        }),
          (error) => {
            console.log(error);
            this.loaderService.display(false);

          }
      }
    });
  }

  deleteUserOrProduct(userId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { type: 'delete', user: this.url }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.loaderService.display(true);
        this.adminService.deleteUser(userId).subscribe((success) => {
          this.loaderService.display(false);
          this.toasterService.pop('success', 'User Deleted Successfully')
          console.log(success);
          this.getUserList(this.url);
        },
          (error) => {
            console.log(error);
            this.loaderService.display(false);
          })
      }
    });
  }
  changeUserStatus(type) {
    this.adminService.deleteUser(type).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'User Deleted Successfully')
      console.log(success);
      this.getUserList(this.url);
    },
      (error) => {
        console.log(error);
        this.loaderService.display(false);
      })
  }

  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.userList = _.filter(this.filteredData, row => {
        return (row['orgName'] ? row['orgName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['orgId'] ? row['orgId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['userId'] ? row['userId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['nickName'] ? (row['nickName'].search(new RegExp(query, 'i')) !== -1) : 0) ||
          (row['emailId'] ? row['emailId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['complianceType'] ? row['complianceType'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['irbName'] ? row['irbName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['irbId'] ? row['irbId'].search(new RegExp(query, 'i')) !== -1 : 0);
      });
      return;
    } else {
      this.userList = this.filteredData;
      return;
    }
  }


}
