import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandComponent } from './component/brand/brand.component';
import { ProductComponent } from './component/product/product.component';
import { AddBrandComponent } from './component/brand/add-brand/add-brand.component';
import { EditBrandComponent } from './component/brand/edit-brand/edit-brand.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteBrandComponent } from './component/brand/delete-brand/delete-brand.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { EditProductComponent } from './component/product/edit-product/edit-product.component';
import { DeleteProductComponent } from './component/product/delete-product/delete-product.component';
import { ShowImageComponent } from './component/show-image/show-image.component';
import {DatePipe} from '@angular/common';
import { UserComponent } from './component/user/user.component';
import { NavComponent } from './component/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ProductComponent,
    AddBrandComponent,
    EditBrandComponent,
    DeleteBrandComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ShowImageComponent,
    UserComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
