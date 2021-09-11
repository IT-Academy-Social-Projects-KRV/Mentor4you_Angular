import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountMentorComponent } from './components/account-mentor/account-mentor.component';
import { AccountMenteeComponent } from './components/account-mentee/account-mentee.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';



@NgModule({
  declarations: [
    AccountMentorComponent,
    AccountMenteeComponent,
    AccountSettingsComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
