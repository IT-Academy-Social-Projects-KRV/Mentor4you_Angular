import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModeratorComponent } from './moderator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModeratorRoutingModule } from './moderator-routing.module';
import { ModeratorBlackListComponent } from './components/moderator-black-list/moderator-black-list.component';
import { ModeratorChatsComponent } from './components/moderator-chats/moderator-chats.component';
import { ModeratorEditComponent } from './components/moderator-edit/moderator-edit.component';
import { ModeratorNavigationComponent } from './components/moderator-navigation/moderator-navigation.component';
import { ModeratorUserDetailsComponent } from './components/moderator-user-details/moderator-user-details.component';
import { ModeratorUsersListComponent } from './components/moderator-users-list/moderator-users-list.component';
import { BlackListItemComponent } from './components/moderator-black-list/black-list-item/black-list-item.component';
import { UserItemComponent } from './components/moderator-users-list/user-item/user-item.component';


@NgModule({
  declarations: [ModeratorComponent, ModeratorBlackListComponent, ModeratorChatsComponent, ModeratorEditComponent, ModeratorNavigationComponent, ModeratorUserDetailsComponent, ModeratorUsersListComponent, BlackListItemComponent, UserItemComponent],
  imports: [
    SharedModule,
    FormsModule,
    HttpClientModule,
    ModeratorRoutingModule
  ]
})
export class ModeratorModule { }
