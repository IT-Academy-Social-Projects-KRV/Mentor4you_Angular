import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointModeratorComponent } from '../appoint-moderator/appoint-moderator.component';
import { BannedUsersComponent } from '../banned-users/banned-users.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UsersComponent } from '../users/users.component';

import { AdminComponent } from './admin.component';

const routes = [
  {
    path: '',
    component: AdminComponent, 

    children:[
      {
        path: '',
        redirectTo:'users',
        pathMatch:'full'
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
       path: 'bannedUsers',
       component: BannedUsersComponent
     },
     {
       path: 'categories',
       component: CategoriesComponent
     },
     {
      path: 'chats', 
    }
    ]
  },

  
//   {
//       path: 'bannedUsers',
//       component: BannedUsersComponent
//  },

//  {
//   path: 'categories',
//   component: 
// },
// {
//   path: 'appointsModerator',
//   component: AppointModeratorComponent
// }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
