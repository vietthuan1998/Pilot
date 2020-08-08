import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandEntity } from 'src/app/models/brand';

@Component({
  selector: 'app-delete-brand',
  templateUrl: './delete-brand.component.html',
  styleUrls: ['./delete-brand.component.css']
})
export class DeleteBrandComponent implements OnInit {

  

  constructor(
    public dialogRef: MatDialogRef<DeleteBrandComponent>
  ) { }

  ngOnInit(): void {
    // if(this.name != undefined)

  }

  confirmDelete() {
    this.dialogRef.close("access");
  }

  closeDialg() {
    this.dialogRef.close(null);
  }
}
