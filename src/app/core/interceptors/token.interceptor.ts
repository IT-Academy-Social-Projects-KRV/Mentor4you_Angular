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
    if(this.auth.isAuth())
    {
      request = request.clone({
        setHeaders:{
          Authorization: this.auth.getToken()
        }
      })
    }
    return next.handle(request);
  }
}