import { NgModule } from '@angular/core';

import { ModeratorComponent } from './moderator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModeratorRoutingModule } from './moderator-routing.module';


@NgModule({
  declarations: [ModeratorComponent],
  imports: [
    SharedModule,
    ModeratorRoutingModule
  ]
})
export class ModeratorModule { }
