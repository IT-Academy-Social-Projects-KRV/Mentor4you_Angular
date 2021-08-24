import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { JwPaginationModule } from "jw-angular-pagination";

import {MentorRoutingModule} from './mentor-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {MainSectionComponent} from './components/main-section/main-section.component';
import {MentorComponent} from './mentor.component';
import {MentorTopComponent} from './components/mentor-top/mentor-top.component';
import { MentorsCardsComponent } from './components/mentors-cards/mentors-cards.component';
import { MentorAddREviewSectionComponent} from './components/mentor-add-review-section/mentor-add-review-section.component'
import { AppStarRaitingComponent } from 'src/app/shared/sharedComponents/star-raiting/app-star-raiting';

@NgModule({
  declarations: [
    MentorComponent,
    MainSectionComponent,
    MentorTopComponent,
    MentorsCardsComponent,
    MentorAddREviewSectionComponent,
    AppStarRaitingComponent,
  ],
  imports: [
    SharedModule,
    MentorRoutingModule,
    JwPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class MentorModule {
}
