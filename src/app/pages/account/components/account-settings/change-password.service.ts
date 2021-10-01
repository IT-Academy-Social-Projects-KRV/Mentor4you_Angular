import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http:HttpClient) { }

  changePassword(data:any)
  {
    return this.http.put("http://localhost:8080/api/users/changePassword",data)
  }

}
