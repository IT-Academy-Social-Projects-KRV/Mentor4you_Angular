import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { IntroductionComponent } from './components/introduction/introduction.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { MentorCardComponent } from 'src/app/shared/sharedComponents/mentor-card/mentor-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NotificationModalComponent } from 'src/app/shared/layout/header/notification-modal/notification-modal.component';
import { MentorshipRequestComponent } from 'src/app/shared/layout/header/notification-modal/mentorship-request/mentorship-request.component';
import { MentorshipApproveComponent } from 'src/app/shared/layout/header/notification-modal/mentorship-approve/mentorship-approve.component';
import { NotificationModalService } from 'src/app/core';

@NgModule({
  declarations: [
    HomeComponent,
    IntroductionComponent,
    CarouselComponent,
    InvitationComponent,
    MentorCardComponent,
    NotificationModalComponent,
    MentorshipRequestComponent,
    MentorshipApproveComponent,
  ],
  imports: [
    SharedModule, 
    HomeRoutingModule, 
    IvyCarouselModule
  ],
  exports: [NotificationModalComponent],
  providers: [NotificationModalService]
})
export class HomeModule {}
