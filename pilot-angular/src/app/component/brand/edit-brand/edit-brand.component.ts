import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandEntity } from 'src/app/models/brand';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  formEdit: FormGroup;
  flagLogo = false;
  flagBrandName1 = false;
  flagBrandName2 = false;
  checkValidate = false;
  brandSearch = this.data.brandName;
  logoName = this.data.logo;
  nameLogo = "";
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BrandEntity
  ) { }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      brandId: this.data.brandId,
      brandName:['',Validators.required],
      description: [this.data.description],
      logo: ['']
      // console.log(brandName),
      // console.log(description)
    });
    console.log(this.formEdit);
  }
  fileChangeEvent(fileInput: any) {
    this.nameLogo = fileInput.target.files[0].name;
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const allowed_types = ['image/png', 'image/jpeg'];

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {         
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  checkBrandName(brandName){
    this.brandService.findBrandByName(brandName).subscribe(res => {
      if (res != null) this.flagBrandName1 = true;
      else this.flagBrandName1 = false;
    })
  }

  onSubmit(){}

  validate(form) {
    let check = true;
    if (form.brandName == '') {
      this.flagBrandName2 = true;
      console.log("brand name trống");
      check = false;
    }
    else {
      console.log("có brand name");
      this.flagBrandName2 = false;
    }
    // this.checkValidate = true;
    return check;
  }

  editBrand(form){
    if(this.validate(form) == true){
      form.logo = this.nameLogo;
      this.brandService.edit(form).subscribe(res =>{
        this.dialogRef.close("edit")
      })
    }
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

}
