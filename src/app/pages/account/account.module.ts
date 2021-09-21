import { NgModule } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountMentorComponent } from './components/account-mentor/account-mentor.component';
import { AccountMenteeComponent } from './components/account-mentee/account-mentee.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AccountComponent } from './account.component';


@NgModule({
  declarations: [
    AccountComponent,
    AccountMentorComponent,
    AccountMenteeComponent,
    AccountSettingsComponent,
  ],
  imports: [
    SharedModule,
    AccountRoutingModule,
    MatChipsModule
  ]
})
export class AccountModule { }
