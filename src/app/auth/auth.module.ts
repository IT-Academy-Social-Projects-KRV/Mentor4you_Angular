import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { CookieService } from 'ngx-cookie-service';
import { SigninService } from './signin/signin.service';

import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {SigninComponent} from "./signin/signin.component";
import { ResponseResetComponent } from './response-reset/response-reset.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    ResponseResetComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    SigninService,
    CookieService
  ]
})
export class AuthModule { }
