import { Component, OnInit } from '@angular/core';
import { BrandEntity } from 'src/app/models/brand';
import { FormGroup } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { DeleteBrandComponent } from './delete-brand/delete-brand.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { ShowImageComponent } from '../show-image/show-image.component';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  displayedColumns: string[] = ['brandId', 'brandName', 'logo', 'description', 'actions'];
  dataSource: any;
  template: BrandEntity[];
  dataSearch: BrandEntity;
  formSearch: FormGroup;

  nameSearch = '';
  currentPage = 0;
  private nameSearcher = '';
  totalPage: number;
  pageNumbersList: Array<number>;
  brandsList: Array<BrandEntity>;
  private flagSearch = false;
  // private flagCheck = false;

  constructor(
    private brandService: BrandService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.nameSearch == '') this.searchBrandsList("");
    else this.searchBrand(this.nameSearch);
    console.log(this.brandService.findBrandByName("apple"));
  }

  searchBrandsList(brandName: string): void {

    this.brandService.getBrandsByPageable(this.currentPage, brandName)
      .subscribe(resp => {
        // Set data table
        this.brandsList = resp['responseData'],
          this.pageNumbersList = resp['pageNumbersList'],
          this.totalPage = resp['totalPage'],
          this.dataSource = new MatTableDataSource(this.brandsList);
        // if (this.flagCheck == true) {
        //   this.setPageChange(this.totalPage - 1);
        //   this.flagCheck = false;
        // }
      });
    if (brandName != '') {
      this.flagSearch = true;
    }

  }

  setPageChange(currentPage: any) {
    this.currentPage = currentPage;
    this.flagSearch ? this.searchBrandsList(this.nameSearcher) :
      this.searchBrandsList('');
  }

  searchBrand(brandName): void {
    if (brandName == "") {
      this.ngOnInit();
      return;
    }
    this.template = [];
    this.brandService
      .findBrandByName(brandName.trim())
      .subscribe(dataSearch => {
        this.template.push(dataSearch);
        this.dataSource = this.template;
        console.log(this.dataSource)
      });
  }

  showLogo(element) {
    let dialogRef = this.dialog.open(ShowImageComponent, {
      data: element,
    });
  }

  deleteBrand(brand: BrandEntity) {
    if (UserService.login == false) {
      this.router.navigateByUrl("/admin");
    }
    else {
      let dialogRef = this.dialog.open(DeleteBrandComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.brandService.delete(brand).subscribe(_ => {
            this.snackBar.open("Deleted!", "X", {
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "right"
            });
            this.ngOnInit();
            this.setPageChange(0);
          },
            error => {
              (error instanceof HttpErrorResponse && error.status === 500) ?
                this.snackBar.open("can't delete brand", "X", { 
                  duration: 3000,
                  verticalPosition: "top",
                  horizontalPosition: "right"
                }) :
                this.snackBar.open("ccccccccc", "X", { duration: 3000 });
            });
        }
      });
    }
  }

  insertBrand() {
    console.log("brand " + UserService.login);
    if (UserService.login == false) {
      this.router.navigateByUrl("/admin");
    }
    else {
      // Open dialog
      let dialogRef = this.dialog.open(AddBrandComponent, {
        maxHeight: '95vh',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          // Refresh data table
          // this.flagCheck = true;
          // this.searchBrandsList("");        
          this.ngOnInit();
        }
      });
    }
  }

  update(brand: BrandEntity) {
    if (UserService.login == false) {
      this.router.navigateByUrl("/admin");
    }
    else {
      // Open dialog
      let dialogRef = this.dialog.open(EditBrandComponent, {
        data: brand,
        maxHeight: '95vh',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.snackBar.open("Complete edit ", "X", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right"
          })
          this.ngOnInit();
          console.log(this.totalPage);
          this.setPageChange(this.currentPage);
        }
      });
    }
  }


}
