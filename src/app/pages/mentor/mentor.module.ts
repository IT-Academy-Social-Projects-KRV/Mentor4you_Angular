import { NgModule } from '@angular/core';

import { MentorComponent } from './mentor.component';
import { MentorRoutingModule } from './mentor-routing.module';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MentorComponent,
    MainSectionComponent
  ],
  imports: [
    SharedModule,
    MentorRoutingModule,
  ]
})

export class MentorModule { }
