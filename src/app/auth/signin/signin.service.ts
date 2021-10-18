import {Injectable, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SigninComponent} from "./signin.component";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs/operators";
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private http:HttpClient) {
  }
  error!:any
  public user: any = {}
  private token: string | null = null;
  private avatar: string | null = null;
  public token$ = new BehaviorSubject<any>(null);
  public profileImageUpdate$ = new Subject<string>();

  private url ='http://localhost:8080/api/auth/login'

  authRedirect(email:any,password:any):Observable<{token:string}>{

    const data:object={
      'email':email,
      'password':password
    }

    return  this.http.post<{token:string, avatar: string}>(this.url,data)
      .pipe(
        tap(
          ({token, avatar})=>{
            localStorage.setItem('token',token);
            localStorage.setItem('avatar',avatar);
            this.setAvatar(avatar);
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

  setAvatar(avatar: any){
    this.profileImageUpdate$.next(avatar);
  }

  setTokenO(token:any) : void{
    this.token$.next(token);
  }

  // get getToken():any{
  //   return localStorage.getItem('token');
  // }
  //
  // get getToken0():any{
  //   return this.token$.subscribe(value =>{
  //   })
  // }

  public isAuth(): boolean {
    if(localStorage.getItem('token')){
      this.setTokenO(localStorage.getItem('token'));
      if(!this.isExpToken(this.token$.value)){
      return true
      }else return false
    }
    else return false
    // return localStorage.getItem('token') ? true : false;
  }

  logout(){
    this.http.put('http://localhost:8080/api/auth/logout',{}).subscribe(value=>{})
    // this.setTokenO(null);
    localStorage.clear();
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getRole(){   
    if(typeof this.token === "string"){
      const role = this.parseJwt(this.token).role[0].authority;
      localStorage.setItem('role', role)
    }
  }

  get isMentor(){
    return localStorage.getItem('role') === "MENTOR";
  }

  get isMentee(){
    return localStorage.getItem('role') === "MENTEE";
  }

  get isModerator(){
    return localStorage.getItem('role') === "MODERATOR";
  }

  get isAdmin(){
    return localStorage.getItem('role') === "ADMIN";
  };

  isExpToken(token:any){
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return isExpired
  }

}
