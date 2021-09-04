import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http'


import { SigninRoutingModule } from './signin-routing.module';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {SigninComponent} from "./signin.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    HttpClientModule,
    NgbDropdownModule,
    ReactiveFormsModule,
  ]
})
export class SigninModule { }
