import { NgModule } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountMentorComponent } from './components/account-mentor/account-mentor.component';
import { AccountMenteeComponent } from './components/account-mentee/account-mentee.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AccountComponent } from './account.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainSectionComponent } from './components/main-section/main-section.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountMentorComponent,
    AccountMenteeComponent,
    AccountSettingsComponent,
    MainSectionComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    
  ],
})
export class AccountModule {}
