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
    // console.log('token ----- ');
    // if(this.auth.isAuth())
    {
      request = request.clone({
        setHeaders:{
    
          Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNZW50b3IxQGdtYWlsLmNvbSIsImlhdCI6MTYzMjkyNzMwNiwiZXhwIjoxNjMzNTMyMTA2fQ.RPB2gbaN6FDvoHREVoY8qdcZqy8hzGXjYx6CvxEPtQ6Bk0HxkAWdVnEZ09cqCVu0Ut1u-J8Sb4RVdIZtVoFQcw"
          // Authorization: this.auth.getToken
        }
      })
    }
    return next.handle(request);
  }
}
