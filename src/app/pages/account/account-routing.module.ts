import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import {AccountSettingsComponent} from "./components/account-settings/account-settings.component";
import { ChangeRoleComponent } from './components/account-settings/change-role/change-role.component';

const routes = [
  {
    path: '',
    component: AccountComponent
  },
  {
    path: 'settings',
    component: AccountSettingsComponent
  },
  {
    path: 'settings/change-role',
    component: ChangeRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
