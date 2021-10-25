import { AuthSignupServices } from '../core/services/auth-signup.service';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from "./signin/signin.component";
import { SigninService } from './signin/signin.service';
import { SignupComponent } from './signup/signup.component';
import { TokenInterceptor } from "../core/interceptors/token.interceptor";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResponseResetComponent } from "./response-reset/response-reset.component";



@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ResetPasswordComponent,
    ResponseResetComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    SigninService,
    CookieService,
    AuthSignupServices
  ]
})
export class AuthModule { }
