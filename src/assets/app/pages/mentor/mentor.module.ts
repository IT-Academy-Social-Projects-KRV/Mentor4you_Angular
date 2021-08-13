import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorComponent } from './mentor.component';



@NgModule({
  declarations: [MentorComponent],
  imports: [
    CommonModule
  ],
  exports: [MentorComponent]
})
export class MentorModule {
}
