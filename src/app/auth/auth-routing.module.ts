import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: SigninComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
