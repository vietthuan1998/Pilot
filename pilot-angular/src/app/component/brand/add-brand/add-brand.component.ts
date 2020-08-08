import { Component, OnInit, Inject } from '@angular/core';
import { BrandService } from 'src/app/service/brand.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { BrandEntity } from 'src/app/models/brand';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  formEdit: FormGroup;
  flagLogo = false;
  flagBrandName1 = false;
  flagBrandName2 = false;
  checkValidate = false;
  brandSearch = "";
  nameLogo = "";
  // private brandName: string = '';
  // checkBrandName = false;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      brandName: ['', Validators.required],
      description: [''],
      logo: ['', Validators.required]
      // logo: ['',Validators.required]
    });

  }

  onSubmit() {
    console.log(this.formEdit.value);
    // if (isNaN(this.data.brandId)) {
    //   this.brandService.insert(this.formEdit.value);
    //   this.dialogRef.close();
    // } else {
    //   this.brandService.edit(this.formEdit.value);
    //   this.dialogRef.close();
    // }
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
  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  checkBrandName(brandName: string) {
    this.brandService.findBrandByName(brandName).subscribe(res => {
      if (res != null) this.flagBrandName1 = true;
      else this.flagBrandName1 = false;
    })
  }

  getBrand(brandName: string) {
    var temp: BrandEntity;
    this.brandService
      .findBrandByName(brandName)
      .subscribe(res => {
        temp = res;
        console.log(temp);
      });
    console.log(temp);
  }

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
    if (form.logo == null || form.logo == "") {
      console.log("logo trống");
      this.flagLogo = true;
      check = false;
    }
    else {
      console.log("có logo");
      this.flagLogo = false;
    }
    // this.checkValidate = true;
    return check;

    // if(form.brandName ==''){
    //   this.flagBrandName2 = true;
    //   this.checkValidate = false;
    // }
  }

  insertBrand(form) {
    console.log(this.nameLogo);
    // temp.substring(temp.lastIndexOf("\"));
    form.logo = this.nameLogo;
    // console.log(form.logo);
    if (this.validate(form) == true) {
      this.brandService.insert(form).subscribe(result => {
        this.dialogRef.close(result);

      });
    }
  }

  closeDialog() {
    this.dialogRef.close(null)
  }



}

