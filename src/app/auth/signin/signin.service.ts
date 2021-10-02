import {Injectable, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SigninComponent} from "./signin.component";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs/operators";
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
    constructor(private http:HttpClient) {
    }
  error!:any
  public user: any = {}
  private token:string|null = null;
  public token$ = new BehaviorSubject<any>(null);

  private url ='http://localhost:8080/api/auth/login'

  authRedirect(email:any,password:any):Observable<{token:string}>{

    const data:object={
      'email':email,
      'password':password
    }

    return  this.http.post<{token:string}>(this.url,data)
      .pipe(
        tap(
          ({token})=>{
            localStorage.setItem('token',token);
            this.setTokenO(token);
            this.setToken(token);
            this.user = this.parseJwt(token);
          }
        )
      )
  }

  setToken(token:any){
      this.token = token;
  }

  setTokenO(token:any) : void{
    this.token$.next(token); 
  } 

  get getToken():any{
    return localStorage.getItem('token');
  }

  public isAuth(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logout(){
      this.setToken(null);
      localStorage.clear();
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

}
