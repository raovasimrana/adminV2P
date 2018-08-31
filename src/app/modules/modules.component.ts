import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, ViewChildren, HostListener, DoCheck } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AccountService } from '../account/auth/account.service';
import { CommonFunctions } from '../commonFunctions';
import { LocalStorage } from '../commons/services/localStorage.service';
import { ConfirmDialogComponent } from '../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { Constants } from '../../config/constant';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'tm-user-management',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, AfterViewInit, DoCheck {

  public toggleleftMenu: boolean;
  public toggleSubMenu: boolean;
  public sectionName = LocalStorage.get('sectionName');
  public constants = Constants;
  public superAdmin: boolean;
  public admin = true;
  public sponser: boolean;
  public cro: boolean;
  public userManagement: boolean;
  public breadCrum: string;
  public trialName = LocalStorage.get('trialName');
  public today: number;
  public role = LocalStorage.get('role');
  public userRole = LocalStorage.get('userRole');


  @ViewChild('pageAside') pageAside: ElementRef;
  user: string;
  bredcrum: string;

  constructor(
    public commonf: CommonFunctions,
    public accountService: AccountService,
    public router: Router,
    public renderer2: Renderer2,
    public elementRef: ElementRef,
    public titleService: Title,
    private datePipe: DatePipe,
    public dialog: MatDialog) {

  }

  onLogout() {
    this.accountService.logout();
  }

  onToggleLeftMenu() {
    this.toggleleftMenu = !this.toggleleftMenu;
    if(this.pageAside){
    this.renderer2.setStyle(this.pageAside.nativeElement, 'height', window.innerHeight + 'px');
    }
  }

  onToggleSubMenu(sectionName) {
    this.sectionName = sectionName;
    switch (sectionName) {
      case 'userManagement': {
          this.router.navigate([`userManagement/users`]);
              break;
      }
    }
        LocalStorage.set('sectionName', this.sectionName);
    // }
    this.toggleleftMenu = true;
}

  ngAfterViewInit() {
    // ====if tablet window===
    if (this.commonf.wWidth() <= 992) {
      this.toggleleftMenu = false;
    } else {
      this.toggleleftMenu = true;
    }
    if(this.sectionName === 'dashboard'){
      this.onToggleLeftMenu();
    }

    // ====if tablet window end===
  }

  ngOnInit() {

if (this.userRole){
  this.userRole = this.userRole.toUpperCase();
}
    this.today = Date.now();
    this.onToggleSubMenu(LocalStorage.get('sectionName'));
    if (localStorage.getItem('isUserLoggedIn')) {
      this.user = localStorage.getItem('nickName');
    }
  }
  public navigateToSubjects(type) {

    switch (type) {
      case 'product': {
        return `product`;
      }
      case 'users': {
        return `users`;
      }
  }
}
  ngDoCheck(): void {
    // const bredcrum = document.getElementById('breadcrum');
    // let url = window.location.hash;
    // const lastIndex = window.location.hash.length - 30;
    // url = window.location.hash.slice(0, lastIndex);
    // const urlArray = url.split('/');
    // urlArray.shift();
    // this.breadCrum = this.commonf.bredcrum(urlArray);
    //
    // this.breadCrum = this.breadCrum.replace("pre Consented", "Interest Expressed");

  }

}

// ===Functions for window resize===
// window.onresize = function () {
//   // document.getElementById('pageAside').style.height = window.innerHeight + 'px';
//   // document.getElementById('dataTable').style.minHeight = window.innerHeight + 'px';
// };
