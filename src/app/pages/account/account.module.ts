import { NgModule } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountMentorComponent } from './components/account-mentor/account-mentor.component';
import { AccountMenteeComponent } from './components/account-mentee/account-mentee.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AccountComponent } from './account.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatChipsModule,
    // MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class AccountModule {}
