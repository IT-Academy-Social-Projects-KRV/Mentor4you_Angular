import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import {SigninComponent} from "./signin/signin.component";
import {SigninService} from "./signin/signin.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../core/interceptors/token.interceptor";



@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers:[
    SigninService
  ]
})
export class AuthModule { }
