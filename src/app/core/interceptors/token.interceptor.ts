import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SigninService} from "../../auth/signin/signin.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private  auth:SigninService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:any
    this.auth.token$.subscribe(value =>{
      token=value} )
    if(this.auth.isAuth())
    // console.log('token ----- ', this.auth.getToken);
    {
      request = request.clone({
        setHeaders:{
          Authorization: token
        }
      })
    }
    return next.handle(request);
  }
}
