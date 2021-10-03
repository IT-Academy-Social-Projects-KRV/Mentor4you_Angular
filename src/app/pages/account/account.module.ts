import { NgModule } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountMentorComponent } from './components/account-mentor/account-mentor.component';
import { AccountMenteeComponent } from './components/account-mentee/account-mentee.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
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
    MatChipsModule,
    ImageCropperModule
  ]
})
export class AccountModule {}
