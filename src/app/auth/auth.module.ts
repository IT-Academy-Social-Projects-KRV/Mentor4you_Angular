import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

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
  ]
})
export class AuthModule { }
