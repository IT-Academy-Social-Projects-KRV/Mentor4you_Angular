import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    // declarations: [AdminComponent],
    imports: [
      SharedModule,
      AdminRoutingModule
    ]
  })
  export class AdminModule {}