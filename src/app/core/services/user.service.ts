import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deletUserDataUrl = 'http://localhost:8080/api/users/delete';
 

  constructor(private http: HttpClient) { }

  
  deleteUser(): Observable<any> {
    return this.http.delete(this.deletUserDataUrl, {});
}
}