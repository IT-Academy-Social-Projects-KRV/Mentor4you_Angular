import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClient, HttpClientModule} from '@angular/common/http'


import { SigninRoutingModule } from './signin-routing.module';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {SigninComponent} from "./signin.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SigninRoutingModule,
    HttpClientModule,
    NgbDropdownModule,
  ]
})
export class SigninModule { }
