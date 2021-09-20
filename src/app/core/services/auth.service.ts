import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8080/system/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  requestReset(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/reset-password`, body);
  }

  newPassword(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/new-password`, body);
  }

  ValidPasswordToken(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/valid-password-token`, body);
  }
  }
