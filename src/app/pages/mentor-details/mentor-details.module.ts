import { NgModule } from '@angular/core';

import { MentorDetailsComponent } from './mentor-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MentorDetailsRoutingModule } from './mentor-details-routing.module';


@NgModule({
  declarations: [MentorDetailsComponent],
  imports: [
    SharedModule,
    MentorDetailsRoutingModule,
  ]
})
export class MentorDetailsModule { }
