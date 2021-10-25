import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  imports: [MatRadioModule],
  exports: [
     MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule
     
  ]
})
export class MaterialModule { }
