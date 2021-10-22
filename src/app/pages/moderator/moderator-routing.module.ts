import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModeratorComponent } from './moderator.component';
import { ModeratorBlackListComponent } from './components/moderator-black-list/moderator-black-list.component';
import { ModeratorChatsComponent } from './components/moderator-chats/moderator-chats.component';
import { ModeratorEditComponent } from './components/moderator-edit/moderator-edit.component';
import { ModeratorUsersListComponent } from './components/moderator-users-list/moderator-users-list.component';

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
        component: ModeratorBlackListComponent
      },      
      {
        path: 'chats',
        component: ModeratorChatsComponent
      },
      {
        path: 'edit',
        component: ModeratorEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
