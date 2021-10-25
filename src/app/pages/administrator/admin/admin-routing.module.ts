import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';

import { AdminComponent } from './admin.component';

const routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
