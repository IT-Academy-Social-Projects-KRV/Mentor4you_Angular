import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import {AccountSettingsComponent} from "./components/account-settings/account-settings.component";

const routes = [
  {
    path: '',
    component: AccountComponent
  },
  {
    path: 'settings',
    component: AccountSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
