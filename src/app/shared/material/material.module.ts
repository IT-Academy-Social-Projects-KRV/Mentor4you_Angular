import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  exports: [
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
