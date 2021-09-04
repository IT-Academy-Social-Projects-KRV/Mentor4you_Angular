import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { TermsComponent } from './pages/terms/terms.component';
import { HttpClient} from "@angular/common/http";
import { SigninComponent } from './auth/signin/signin.component';
import {SigninService} from "./auth/signin/signin.service";

import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CookieService} from "ngx-cookie-service";
// import { MentorDetailsComponent } from './pages/mentor-details/mentor-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
    SigninComponent,
    // MentorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [SigninService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
