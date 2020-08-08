import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserEntity } from '../models/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static login :boolean = false;
  
  constructor(
    private http: HttpClient,
    
  ) { }

  private serverUrl = 'http://localhost:8080/pilot-java/admin';

  getUser(userName: string): Observable<UserEntity>{
    const url = this.serverUrl +"/get-user/" + userName;
    return this.http.get<UserEntity>(url);
  }

}
