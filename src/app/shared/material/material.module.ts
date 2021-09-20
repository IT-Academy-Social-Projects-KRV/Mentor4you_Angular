import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
<<<<<<< HEAD
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
=======
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

>>>>>>> origin/test_account_mentor

@NgModule({
  imports: [MatRadioModule],
  exports: [
    MatIconModule,
<<<<<<< HEAD
    MatSlideToggleModule
=======
    MatSlideToggleModule,
    MatRadioModule,
>>>>>>> origin/test_account_mentor
  ]
})
export class MaterialModule { }
