import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperModule } from 'ngx-image-cropper';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { TermsComponent } from './pages/terms/terms.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { NotificationModalService } from './core/services/notification-modal.service';
import { MessagesComponent } from './pages/messages/messages.component';
import {AccountModule} from "./pages/account/account.module";
import {ChangePasswordService} from "./pages/account/components/account-settings/change-password.service";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {AuthModule} from "./auth/auth.module";
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { NotificationModalModule } from './shared/layout/header/notification-modal/notification-modal.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
    MessagesComponent,
    HowItWorksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AccountModule,
    HttpClientModule,
    NotificationModalModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      timeOut: 8000,
    })
  ],
  providers: [CookieService,NotificationModalService,ChangePasswordService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
