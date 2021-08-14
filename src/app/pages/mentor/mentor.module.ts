import { NgModule } from '@angular/core';

import { MentorComponent } from './mentor.component';
import { MentorRouterModule } from './mentor-router.module';

@NgModule({
  declarations: [MentorComponent],
  imports: [MentorRouterModule]
})
export class MentorModule { }
