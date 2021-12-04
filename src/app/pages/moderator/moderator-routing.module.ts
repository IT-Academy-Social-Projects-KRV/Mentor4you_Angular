import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModeratorComponent } from './moderator.component';
import { ModeratorBlackListComponent } from './components/moderator-black-list/moderator-black-list.component';
import { ModeratorEditComponent } from './components/moderator-edit/moderator-edit.component';
import { ModeratorUsersListComponent } from './components/moderator-users-list/moderator-users-list.component';
import { ModeratorResolver } from './moderator.resolver';

const routes = [
  {
    path: '',
    component: ModeratorComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },      
      { 
        path: 'users',
        component: ModeratorUsersListComponent  
      },
      {
        path: 'black-list',
        component: ModeratorBlackListComponent,
        resolve: [ModeratorResolver]
      },
      {
        path: 'edit',
        component: ModeratorEditComponent,
        resolve: [ModeratorResolver]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
