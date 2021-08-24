import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MentorDetailsComponent } from './mentor-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MentorDetailsRoutingModule } from './mentor-details-routing.module';
import { MentorAddREviewSectionComponent } from './components/mentor-add-review-section/mentor-add-review-section.component';
import { AppStarRaitingComponent } from '../../shared/sharedComponents/star-raiting/app-star-raiting';
import { MainSectionComponent } from './components/main-section/main-section.component';



@NgModule({
  declarations: [
    MentorDetailsComponent,
    MentorAddREviewSectionComponent,
    AppStarRaitingComponent, 
    MainSectionComponent],
    
  imports: [
    SharedModule,
    MentorDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MentorDetailsModule { }
