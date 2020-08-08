import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrandEntity } from '../models/brand';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient
  ) { }

  private serverUrl = 'http://localhost:8080/pilot-java/brand';

  

  getBrands() {
    // get data form server
    const url = this.serverUrl + '/getall';
    return this.http.get<BrandEntity[]>(url);

    // get data from file 
    // return brandData;
  }

  getBrandName(){
    const url = this.serverUrl + '/get-all-brand-name';
    return this.http.get<string[]>(url);
  }

  getBrandsByPageable(page: number, name: string){
    const url = this.serverUrl + '/get-brands?page=' + page + '&name=' + name;
    return this.http.get(url)
  }

  findBrandByName(brandName: string) {
    const url = this.serverUrl + '/find-brand-by-name/' + brandName;
    return this.http.get<BrandEntity>(url);
  }

  delete(brand:BrandEntity): Observable<BrandEntity> {
    const url = this.serverUrl + '/delete-brand/' + brand.brandId;
    return this.http.delete<BrandEntity>(url,httpOptions);
  }

  insert(newBrand: BrandEntity){
    const url = this.serverUrl + '/insert-brand';
    return this.http.post<BrandEntity>(url,newBrand,httpOptions).pipe(
      tap((brand: BrandEntity) => console.log("insert brand = " + brand.brandName)),
      catchError(error => of(new BrandEntity()))
    );
  }

  edit(brand: BrandEntity){
    const url = this.serverUrl + '/update-brand';
    return this.http.put(url,brand,httpOptions);
  }

}
