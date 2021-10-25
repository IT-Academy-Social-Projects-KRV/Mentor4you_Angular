import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BannedUsersComponent } from '../banned-users/banned-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
    // declarations: [],
    imports: [
      SharedModule,
      AdminRoutingModule
    ]
  })
  export class AdminModule {}