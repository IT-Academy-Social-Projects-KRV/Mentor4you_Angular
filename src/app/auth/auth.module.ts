import { NgModule } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import {SigninComponent} from "./signin/signin.component";
import { SigninService } from './signin/signin.service';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
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
