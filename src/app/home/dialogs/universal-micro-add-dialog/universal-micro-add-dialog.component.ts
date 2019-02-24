import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UniversalMicroAddService} from '../../services/universal-micro-add/universal-micro-add.service';
interface dataObject {
  storeId ?: string;
  type ?: string;
  src ?: string;
  name ?: string;
  taxInPercentage ?: number;
}

@Component({
  selector: 'app-universal-micro-add-dialog',
  templateUrl: './universal-micro-add-dialog.component.html',
  styleUrls: ['./universal-micro-add-dialog.component.css']
})
export class UniversalMicroAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UniversalMicroAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataObject, public service: UniversalMicroAddService) {

  }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
  addToDb() {
    this.service
      .addProductMicroConfig(
        this.data['storeId'],
        this.data['type'],
        this.data['src'],
        this.data['name'],
        this.data['taxInPercentage']);
  }
}
