import {NgModule} from '@angular/core';

import {MentorRoutingModule} from './mentor-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {MainSectionComponent} from './components/main-section/main-section.component';
import {MentorComponent} from './mentor.component';
import {MentorTopComponent} from './components/mentor-top/mentor-top.component';


@NgModule({
  declarations: [
    MentorComponent,
    MainSectionComponent,
    MentorTopComponent
  ],
  imports: [
    SharedModule,
    MentorRoutingModule,
  ]
})

export class MentorModule {
}
