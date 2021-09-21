import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [MatRadioModule],
  exports: [
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
