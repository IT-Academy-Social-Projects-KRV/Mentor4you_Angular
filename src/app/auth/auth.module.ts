import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
//import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import {SigninComponent} from "./signin/signin.component";



@NgModule({
  declarations: [
<<<<<<< HEAD
    SigninComponent,
    SignupComponent,
    //ResetPasswordComponent
=======
    SignupComponent,
    SigninComponent
>>>>>>> dev
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
