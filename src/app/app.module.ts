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
import { NotificationModalComponent } from './shared/layout/header/notification-modal/notification-modal.component';
import { NotificationModalService } from './core/services/notification-modal.service';
import { MentorshipRequestComponent } from './shared/layout/header/notification-modal/mentorship-request/mentorship-request.component';
import { MentorshipApproveComponent } from './shared/layout/header/notification-modal/mentorship-approve/mentorship-approve.component';
import { MessagesComponent } from './pages/messages/messages.component';


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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule
  ],
  providers: [NotificationModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
