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
        email: ['', Validators.required],
        phone: ['', Validators.required],
        userType:['', Validators.required],
        experience:['',Validators.required],
        address:['', Validators.required]
      }),
      product: this.fb.group({
        productName: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        content:['', Validators.required]
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
          this.form['controls'].users.setValue(this.data.data);       
        }
        case 'product' :{
         this.form['controls'].product.setValue(this.data.data);
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
      this.formData.append('email',this.form['controls'].users['controls'].email.value);
      this.formData.append('phone',this.form['controls'].users['controls'].phone.value);
      this.formData.append('userType',this.form['controls'].users['controls'].userType.value);
      this.formData.append('address',this.form['controls'].users['controls'].address.value);
      this.formData.append('experience', JSON.stringify([this.form['controls'].users['controls'].experience.value]));
      console.log("value", this.form['controls'].users['controls'].experience.value);
      
      this.formData.append('image', this.imageData[0]);
      this.dialogRef.close(this.formData);
   } else {
    console.log('invalid form');
}
        break;
      }
      case 'product': {
        if(this.form['controls'].product.valid && (this.data.data || this.imageData.length)){
          console.log(this.form['controls'].product.value , this.imageData)
          this.formData.append('productName',this.form['controls'].product['controls'].productName.value);
          this.formData.append('price',this.form['controls'].product['controls'].price.value);
          this.formData.append('description',this.form['controls'].product['controls'].description.value);
          this.formData.append('contents',this.form['controls'].product['controls'].content.value);
          
          this.formData.append('image', this.imageData[0]);
          this.dialogRef.close(this.formData);
        } else {
          console.log('invalid form');
        }
        break;
      }
    }


  }
}
