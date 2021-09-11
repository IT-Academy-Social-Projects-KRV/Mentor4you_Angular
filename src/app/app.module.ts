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
import { SigninComponent } from './auth/signin/signin.component';
import {SigninService} from "./auth/signin/signin.service";

import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CookieService} from "ngx-cookie-service";
import { NotificationModalComponent } from './shared/layout/header/notification-modal/notification-modal.component';
import { NotificationModalService } from './core/services/notification-modal.service';
import { MentorshipRequestComponent } from './shared/layout/header/notification-modal/mentorship-request/mentorship-request.component';
import { MentorshipApproveComponent } from './shared/layout/header/notification-modal/mentorship-approve/mentorship-approve.component';
import { MessagesComponent } from './pages/messages/messages.component';
<<<<<<< HEAD
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResponseResetComponent } from './auth/response-reset/response-reset.component';
// import { MentorDetailsComponent } from './pages/mentor-details/mentor-details.component';
=======
import {AuthModule} from "./auth/auth.module";
>>>>>>> dev


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
    NotificationModalComponent,
    MentorshipRequestComponent,
    MentorshipApproveComponent,
    MessagesComponent,
    ResetPasswordComponent,
    ResponseResetComponent,
    // MentorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
  ],
  providers: [SigninService,CookieService,NotificationModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
