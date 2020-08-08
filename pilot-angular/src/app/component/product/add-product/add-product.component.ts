import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandService } from 'src/app/service/brand.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formEdit: FormGroup;
  flagLogo = false;
  flagProductName = false;
  flagBrandName = false;
  flagQuantity = false;
  flagPrice = false;
  flagDate = false;
  checkValidate = false;
  productSearch = "";
  brandNamesList: string[];
  nameLogo = "";

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) { }

  ngOnInit(): void {
    // var date = new Date('dd/MM/yyyy');
    // console.log(date);
    this.formEdit = this.fb.group({
      productName: ["", Validators.required],
      quantity: ["0", Validators.required],
      price: ["0", Validators.required],
      brandName: [""],
      saleDate: ["", Validators.required],
      image: ["", Validators.required],
      description: [""]
    });

    this.brandService.getBrandName().subscribe(data => {
      this.brandNamesList = data;
    })
  }

  onSubmit() { }

  validate(form) {
    let check = true;

    if (form.productName == "") {
      this.flagProductName = true;
      check = false;
    }
    else this.flagProductName = false;

    if (form.quantity == 0) {
      this.flagQuantity = true;
      check = false;
    }
    else this.flagQuantity = false;

    if (form.price == 0) {
      this.flagPrice = true;
      check = false;
    }
    else this.flagPrice = false;

    if (form.saleDate == "" || form.saleDate == null) {
      this.flagDate = true;
      check = false;
    }
    else this.flagDate = false;

    if (form.brandName == "") {
      this.flagBrandName = true;
      check = false;
    }
    else this.flagBrandName = false;

    if (form.image == null || form.image == "") {
      this.flagLogo = true;
      check = false;
    }
    else this.flagLogo = false;

    return check;
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
  insertBrand(formEdit) {
    console.log(formEdit.saleDate);

    if (this.validate(formEdit) == true) {
      this.brandService.findBrandByName(formEdit.brandName).subscribe(brand => {
        formEdit.image = this.nameLogo;
        formEdit.brandEntity = brand;
        this.productService.insert(formEdit).subscribe(res => {
          this.dialogRef.close("res");
        });
      });

    }
  }
  closeDialog() {
    this.dialogRef.close(null);
  }
}
