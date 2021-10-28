import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BannedUsersComponent } from '../banned-users/banned-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';



@NgModule({
    // declarations: [],
    imports: [
      SharedModule,
      AdminRoutingModule,
      CommonModule
    ]
  })
  export class AdminModule {}