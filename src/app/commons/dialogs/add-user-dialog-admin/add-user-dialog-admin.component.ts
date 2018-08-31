import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppConfig } from '../../../../config/appConfig';
import { Constants } from '../../../../config/constant';
import { UserManagementService } from '../../../modules/user_management/user-management.service';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'tm-add-user-dialog-admin',
  templateUrl: './add-user-dialog-admin.component.html',
  styleUrls: ['./add-user-dialog-admin.component.css']
})
export class AddUserDialogAdminComponent implements OnInit {
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  namePattern = '^[a-zA-Z ]{3,20}$';
  public form: FormGroup;
  siteCoordinators: any = [];
  public Object: Object;
  public submitted: Boolean = false;
  public type: string;
  public constants = Constants;
  public sponsorUsers: any = [];
  public croUsers: any = [];
  public piUsers: any = [];
  public sponsorName = []
  public roles = [
    {
      '_id': this.constants.sitesId,
      'name': 'Site Coordinator'
    },
    {
      '_id': this.constants.piId,
      'name': 'PI'
    }
  ]
  public imageData: any = [];
 public formData = new FormData();
  constructor(public dialogRef: MatDialogRef<AddUserDialogAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public userManagementService: UserManagementService,
    public toasterService: ToasterService) {
    this.form = this.fb.group({
      users: this.fb.group({
        name: ['', Validators.required],
        emailId: ['', Validators.required],
        contact: ['', Validators.required],
        type:['', Validators.required],
      }),
      product: this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        content:['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    console.log('data', this.data);
    //  ---------------------------------------------------Setting the role ----------------------------------------------------------
    this.type = this.data.type;
    this.submitted = false;
    if(this.data.data){
      switch(this.data.url){
        case 'users' :{
          this.form['controls'].users['controls'].name.setValue(this.data.data.name);
            this.form['controls'].users['controls'].emailId.setValue(this.data.data.email);
              this.form['controls'].users['controls'].contact.setValue(this.data.data.phone);
                this.form['controls'].users['controls'].type.setValue(this.data.data.userType);
        }
        case 'product' :{
          this.form['controls'].product['controls'].name.setValue(this.data.data.name);
            this.form['controls'].product['controls'].emailId.setValue(this.data.data.email);
              this.form['controls'].product['controls'].contact.setValue(this.data.data.phone);
                this.form['controls'].product['controls'].type.setValue(this.data.data.userType);
        }
      }
    }
    }
public onFileChange(event){
  this.imageData= [];
  this.imageData.push(event.target.files[0]);
  console.log(this.imageData);
}

  //----------------------------- Saving Form Data ----------------------------------------------------------------------
  public saveUsers() {
    this.submitted = true;
    switch (this.data.url) {
      case 'users': {
    if(this.form['controls'].users.valid && (this.data.data || this.imageData.length)){
      console.log(this.form['controls'].users , this.imageData)
      this.formData.append('name',this.form['controls'].users['controls'].name.value);
      this.formData.append('emailId',this.form['controls'].users['controls'].emailId.value);
      this.formData.append('contact',this.form['controls'].users['controls'].contact.value);
      this.formData.append('type',this.form['controls'].users['controls'].type.value);
      this.formData.append('image', this.imageData[0]);
      this.dialogRef.close(this.formData);
   } else {
    console.log('invalid form');
}
        break;
      }
      case 'product': {
        if(this.form['controls'].product.valid && this.imageData.length){
          console.log(this.form['controls'].product.value , this.imageData)
        } else {
          console.log('invalid form');
        }
        break;
      }
    }


  }
}
