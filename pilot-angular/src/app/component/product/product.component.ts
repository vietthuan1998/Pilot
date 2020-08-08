import { Component, OnInit } from '@angular/core';
import { ProductEntity } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { BrandService } from 'src/app/service/brand.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowImageComponent } from '../show-image/show-image.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'quantity', 'price', 'brandEntity', 'saleDate', 'image', 'actions'];
  dataSource: any;
  private formSearchNull = { 'productName': '', 'brandName': '', 'priceFrom': 0, 'priceTo': 0 };
  currentPage = 0;
  productsList: ProductEntity[];
  pageNumbersList: Array<number>;
  totalPage: number;
  formSearch: FormGroup;
  brandNamesList: string[];
  list: number[];

  flagSearch = false;
  flagCheck = false;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.searchProductsList(this.formSearchNull);

    this.setPageChange(0);
    

    this.formSearch = this.fb.group({
      productName: "",
      brandName: "",
      priceFrom: 0,
      priceTo: 0
    });

    this.brandService.getBrandName().subscribe(data => {
      this.brandNamesList = data;
    });

    // this.setPageChange(0);
    

  }

  searchProductsList(body: any) {

    this.productService.getProductsByPageable(this.currentPage, body)
      .subscribe(resp => {
        // Set data table
        this.productsList = resp['responseData'],
        this.pageNumbersList = resp['pageNumbersList'],
        this.totalPage = resp['totalPage'],
        this.dataSource = new MatTableDataSource(this.productsList);
        console.log(this.productsList.length);
        // if (this.flagCheck == true) {
        //   this.setPageChange(this.totalPage - 1);
        //   this.flagCheck = false;
        // }

      });

    
    // for (let i = 0; i < this.productsList.length; i++) {
    //   this.list[i] = i*this.totalPage+1;      
    // }

    // If using search
    if (body.productName != '' || body.brandName != '' || body.priceFrom != 0 || body.priceTo != 0) {
      this.flagSearch = true;
    }
    // console.log("brand name ==> " + body.brandName);
    // console.log(this.dataSource);
    
  }

  setPageChange(currentPage: number) {
    
    this.currentPage = currentPage;
    this.flagSearch ? this.searchProductsList(this.formSearch.value) :
      this.searchProductsList(this.formSearchNull);
    // console.log(this.productsList);
  }

  showLogo(element) {
    let dialogRef = this.dialog.open(ShowImageComponent, {
      data: element,
    });
  }

  update(product) {
    if (UserService.login == false) {
      this.router.navigateByUrl("/admin");
    }
    else {
      let dialogRef = this.dialog.open(EditProductComponent, {
        data: product,
        maxHeight: '95vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.snackBar.open("Complete edit ", "X", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right"
          })
          this.ngOnInit();
          this.setPageChange(this.currentPage);
        }
      });
    }
  }

  insert() {
    if (UserService.login == false) {
      this.router.navigateByUrl("/admin");
    }
    else {
      let dialogRef = this.dialog.open(AddProductComponent, {
        maxHeight: '95vh',
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res != null) {
          // this.flagCheck = true;
          this.ngOnInit();
        }
      });
    }
  }

  delete(product: ProductEntity) {
    if (UserService.login == false) {
      this.router.navigateByUrl("/admin");
    }
    else {
      console.log(product.productName);
      let dialogRef = this.dialog.open(DeleteProductComponent);
      dialogRef.afterClosed().subscribe(res => {
        if (res != null) {
          this.productService.delete(product).subscribe(_ => {
            this.snackBar.open("Deleted ", "X", {
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "right"
            });
            this.ngOnInit();
            this.setPageChange(0);
          },
            error => {
              this.snackBar.open("Lỗi", "X", {
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "right"
              });
            });
        }
      });
    }
  }

}
