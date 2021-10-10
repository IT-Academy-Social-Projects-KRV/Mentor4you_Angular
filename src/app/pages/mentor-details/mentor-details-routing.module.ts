import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorDetailsComponent } from './mentor-details.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: ':id',
    component: MentorDetailsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorDetailsRoutingModule { }
