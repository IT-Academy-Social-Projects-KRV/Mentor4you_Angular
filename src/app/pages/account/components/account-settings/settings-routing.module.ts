import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings.component';
import { ChangeRoleComponent } from './change-role/change-role.component';

const routes = [
  {
    path: '',
    component: AccountSettingsComponent,
  },
  {
    path: 'change-role',
    component: ChangeRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
