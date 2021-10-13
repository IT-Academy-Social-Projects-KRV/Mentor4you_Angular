
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MentorDetailsComponent } from './mentor-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MentorDetailsRoutingModule } from './mentor-details-routing.module';
import { MentorAddREviewSectionComponent } from './components/mentor-add-review-section/mentor-add-review-section.component';
import { AppStarRaitingComponent } from '../../shared/sharedComponents/star-raiting/app-star-raiting';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { MentorReviewsComponent } from './components/mentor-reviews/mentor-reviews.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MentorDetailsComponent,
    MentorAddREviewSectionComponent,
    AppStarRaitingComponent, 
    MainSectionComponent,
    MentorReviewsComponent
  ],
   
  imports: [
    SharedModule,
    MentorDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class MentorDetailsModule { }
