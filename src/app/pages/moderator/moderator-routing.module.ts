import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModeratorComponent } from './moderator.component';

const routes = [
  {
    path: '',
    component: ModeratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
