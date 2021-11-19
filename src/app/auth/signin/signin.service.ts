import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";


import { UserService } from 'src/app/core';
import mockAvatar from 'src/app/core/mock/mockAvatar';
import { LoginDataUser } from 'src/app/core/interfaces/user';


@Injectable({
  providedIn: 'root'
})

export class SigninService {

  error!:any;
  user = {};
  token$ = new BehaviorSubject<string | null>('');
  mockAvatar = mockAvatar;
  standartUserAvatar = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  private token: string | null = null;
  private url ='http://localhost:8080/api/auth/login';
  private forgetUrl = 'http://localhost:8080/sendSecurityEmail';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}



  authRedirect(email:string, password:string): Observable<{token: string}> {

    const data: Object = {
      'email':email,
      'password':password
    }

    return  this.http.post<LoginDataUser>(this.url, data)
      .pipe(
        tap(
          ({token, avatar, name, secondName, role})=>{
            localStorage.setItem('token', token);
            const currentAvatar = avatar === this.standartUserAvatar ? this.mockAvatar : avatar;
            this.userService.setAvatar(currentAvatar);

            const userName = `${name} ${secondName}`;
            this.userService.setUserName(userName);

            this.setTokenO(token);   // ------------------ ???
            this.setToken(token);      // ------------------  ???
            this.user = this.parseJwt(token);            
          }
        )
      )
  }
  
  // setToken(token: any) {  // ------------------  ???
  setToken(token: string | null): void {  // ------------------  ???
    this.token = token;
  }

  // setTokenO(token:any) : void {    // ------------------  ???
  setTokenO(token: string | null) : void {    // ------------------  ???
    this.token$.next(token);
  }

  public isAuth(): boolean {
    if (localStorage.getItem('token')) {
      this.setTokenO(localStorage.getItem('token'));
      if (!this.isExpToken(this.token$.value)) {
        return true;
      } else return false;
    }
    else return false;
  }

  logout(){
    this.http.put('http://localhost:8080/api/auth/logout', {}).subscribe();
    localStorage.clear();
  }

  parseJwt (token:string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');    
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {  // parse token
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));    

    return JSON.parse(jsonPayload);
  }

  getRole(){   
    if (typeof this.token === "string") {
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

  resetPassword(email:string): Observable<any>{
    return this.http.get(this.forgetUrl + `/${email}`);
  }

}
