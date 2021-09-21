import {Injectable, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SigninComponent} from "./signin.component";
import {FormGroup} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SigninService {
    constructor(private http:HttpClient) {
    }
  error!:any
  private token:string|null=null

  private url ='http://localhost:8080/system/auth'

  authRedirect(email:any,password:any):Observable<{token:string}>{

    const data:object={
      'login':email,
      'password':password
    }

    return  this.http.post<{token:string}>(this.url,data)
      .pipe(
        tap(
          ({token})=>{
            localStorage.setItem('token',token);
            this.setToken(token);
          }
        )
      )
  }

  // postData(email:any,password:any){
  //
  //   const data:object={
  //     'login':email,
  //     'password':password
  //   }
  //
  //    this.http.post(this.url,data).subscribe(response=>{
  //       const {token}:any=response;
  //       if(token){
  //
  //         localStorage.setItem('token',token);
  //         this.setToken(token);
  //       };
  //
  //     },
  //     error => {this.error=error.status;}
  //     )
  //
  //
  // }

  setToken(token:any){
      this.token=token//?????
  }

  getToken():any{

      return this.token;
  }

  isAuth():boolean{

      return  !!this.token;
  }

  logout(){
      this.setToken(null);
      localStorage.clear();
  }

}
