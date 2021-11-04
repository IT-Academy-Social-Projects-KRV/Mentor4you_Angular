import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from "@ngx-translate/core";
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { MentorCardComponent } from 'src/app/shared/sharedComponents/mentor-card/mentor-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    HomeComponent,
    IntroductionComponent,
    CarouselComponent,
    InvitationComponent,
    MentorCardComponent,
  ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        IvyCarouselModule,
        TranslateModule,
        RouterModule
    ],
  exports: [],
  providers: []
})
export class HomeModule {}
