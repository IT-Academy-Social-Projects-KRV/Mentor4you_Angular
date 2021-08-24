import {NgModule} from '@angular/core';
import { JwPaginationModule } from "jw-angular-pagination";

import {MentorRoutingModule} from './mentor-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {MainSectionComponent} from './components/main-section/main-section.component';
import {MentorComponent} from './mentor.component';
import {MentorTopComponent} from './components/mentor-top/mentor-top.component';
import { MentorsCardsComponent } from './components/mentors-cards/mentors-cards.component';


@NgModule({
  declarations: [
    MentorComponent,
    MainSectionComponent,
    MentorTopComponent,
    MentorsCardsComponent
  ],
  imports: [
    SharedModule,
    MentorRoutingModule,
    JwPaginationModule
  ]
})

export class MentorModule {
}
