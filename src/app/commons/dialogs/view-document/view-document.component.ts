import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AppConfig } from '../../../../config/appConfig';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'tm-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {
public urls=[
  {
  "url":"http://ec2-54-90-72-104.compute-1.amazonaws.com/wheel_1536348489471.jpg",
  "name":"My File 1"
  },
  {
    "url":"http://ec2-54-90-72-104.compute-1.amazonaws.com/venkys-ventripro-200gm_1535956259947.jpg",
    "name":"My File 2"
    },
];
public documents;
  constructor(public dialogRef: MatDialogRef<ViewDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.documents = this.data.data.photo;
  }
  openFile(filePath){
    window.open(`${AppConfig.fileUrl}?fileName=${filePath}`);
  }
}
