import { NgModule } from '@angular/core';

import { MentorComponent } from './mentor.component';
import { MentorRouterModule } from './mentor-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MentorComponent],
  imports: [MentorRouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MentorModule { }
