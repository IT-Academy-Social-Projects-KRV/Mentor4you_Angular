import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorComponent } from './mentor.component';
import { MentorRouterModule } from './mentor-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [MentorComponent],
  imports: [MentorRouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
  ]
})
export class MentorModule { }
