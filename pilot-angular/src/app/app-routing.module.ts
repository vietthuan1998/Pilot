import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { ProductComponent } from './component/product/product.component';
import { UserComponent } from './component/user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'brand', component: BrandComponent },
  { path: 'product', component: ProductComponent },
  { path: 'admin', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
