import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { JwPaginationModule } from "jw-angular-pagination";

import {MentorRoutingModule} from './mentor-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {MentorComponent} from './mentor.component';
import {MentorTopComponent} from './components/mentor-top/mentor-top.component';
import { MentorsCardsComponent } from './components/mentors-cards/mentors-cards.component';


@NgModule({
  declarations: [
    MentorComponent,
    MentorTopComponent,
    MentorsCardsComponent,

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
