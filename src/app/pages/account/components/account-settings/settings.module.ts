import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountSettingsComponent } from './account-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { LanguagesComponent } from './languages/languages.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    ChangeRoleComponent,
    LanguagesComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {}
