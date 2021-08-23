import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { IntroductionComponent } from './components/introduction/introduction.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { MentorCardComponent } from 'src/app/shared/sharedComponents/mentor-card/mentor-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    IntroductionComponent,
    CarouselComponent,
    InvitationComponent,
    MentorCardComponent,
  ],
  imports: [SharedModule, HomeRoutingModule, IvyCarouselModule],
})
export class HomeModule {}
