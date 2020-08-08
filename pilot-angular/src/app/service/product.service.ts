import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductEntity } from '../models/product';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private serverUrl='http://localhost:8080/pilot-java/product';
  
  getProducts(){
     // get data form server
    const url = this.serverUrl + '/get-all-product';
    return this.http.get<ProductEntity[]>(url);

    // get data from file 
    // return productData;
  }

  getProductsByPageable(page: number, body: any) {
    const url = this.serverUrl + '/get-products?page=' + page;
    return this.http.post(url, body, httpOptions);
  }

  delete(product:ProductEntity): Observable<ProductEntity> {
    const url = this.serverUrl + '/delete-product/' + product.productId;
    return this.http.delete<ProductEntity>(url,httpOptions);
  }

  insert(newBrand: ProductEntity){
    const url = this.serverUrl + '/insert-product';
    return this.http.post<ProductEntity>(url,newBrand,httpOptions);
  }

  edit(brand: ProductEntity){
    const url = this.serverUrl + '/update-product';
    return this.http.put(url,brand,httpOptions);
  }

}
