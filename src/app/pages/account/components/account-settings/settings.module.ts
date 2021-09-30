import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccountSettingsComponent } from './account-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangeRoleComponent } from './change-role/change-role.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    ChangeRoleComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {}
