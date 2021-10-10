import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorDetailsComponent } from './mentor-details.component';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from 'src/app/core/interceptors/auth.guard';

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
