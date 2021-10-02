import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountMentorComponent } from './components/account-mentor/account-mentor.component';
import { AccountMenteeComponent } from './components/account-mentee/account-mentee.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { AccountComponent } from './account.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};
@NgModule({
  declarations: [
    AccountComponent,
    AccountMentorComponent,
    AccountMenteeComponent,
    // AccountSettingsComponent,
    MainSectionComponent
  ],
  imports: [
    SharedModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    AccountRoutingModule,
    MatChipsModule
  ]
})
export class AccountModule {}
