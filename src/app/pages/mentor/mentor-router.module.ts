import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MentorComponent } from './mentor.component';

const routes: Routes = [
  {
    path: 'mentor',
    component: MentorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class MentorRouterModule { }
