import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { IntroductionComponent } from './components/introduction/introduction.component';
import { InvitationComponent } from './components/invitation/invitation.component';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent, CarouselComponent, IntroductionComponent, InvitationComponent],
  imports: [HomeRoutingModule, IvyCarouselModule, CommonModule],
})
export class HomeModule {}
