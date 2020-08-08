import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { BrandService } from 'src/app/service/brand.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { ProductEntity } from 'src/app/models/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductEntity,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // var date = new Date('dd/MM/yyyy');
    // console.log(date);
    this.formEdit = this.fb.group({
      productId: [this.data.productId],
      productName: [this.data.productName],
      quantity: [this.data.quantity],
      price: [this.data.price],
      brandName: [this.data.brandEntity.brandName],
      saleDate: [this.datePipe.transform(this.data.saleDate,"yyyy-MM-dd")],
      image: [this.data.image],
      description: [this.data.description]
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

    if (form.brandName == "") {
      this.flagBrandName = true;
      check = false;
    }
    else this.flagBrandName = false;   

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
  update(formEdit) {
    console.log(formEdit.saleDate);

    if (this.validate(formEdit) == true) {
      this.brandService.findBrandByName(formEdit.brandName).subscribe(brand => {
        formEdit.image = this.nameLogo;
        formEdit.brandEntity = brand;
        this.productService.edit(formEdit).subscribe(res => {
          this.dialogRef.close("res");
        });
      });

    }
  }
  closeDialog() {
    this.dialogRef.close(null);
  }
}
