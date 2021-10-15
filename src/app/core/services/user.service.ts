import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deletUserDataUrl = 'http://localhost:8080/api/users/delete';
  getUsersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  

  getUser():Observable<any>{
    return this.http.get(this.getUsersUrl);
  }

  deleteUser(): Observable<any> {
    return this.http.delete(this.deletUserDataUrl, {});
}
}
