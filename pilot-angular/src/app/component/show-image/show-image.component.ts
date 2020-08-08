import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  flagLogo = false;
  flagImage = false;
  image: string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ShowImageComponent>
  ) { }

  ngOnInit(): void {
    if(this.data.logo != undefined){
      this.image = this.data.logo;
      this.flagImage = false;
      this.flagLogo = true;
    }

    if(this.data.image != undefined){
      this.image = this.data.image;
      this.flagImage = true;
      this.flagLogo = false;
    }

  }

}
