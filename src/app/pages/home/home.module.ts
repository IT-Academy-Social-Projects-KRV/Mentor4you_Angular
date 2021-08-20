import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { InvitationComponent } from './components/invitation/invitation.component';


@NgModule({
  declarations: [HomeComponent, IntroductionComponent, InvitationComponent],
  imports: [HomeRoutingModule]
})
export class HomeModule { }
