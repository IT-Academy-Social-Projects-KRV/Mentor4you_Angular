import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorComponent } from './mentor.component';
<<<<<<< HEAD
import { MentorRoutingModule } from './mentor-routing.module';

@NgModule({
  declarations: [MentorComponent],
  imports: [
    CommonModule,
    MentorRoutingModule
  ]
=======
import { MentorRouterModule } from './mentor-router.module';
import { MainSectionComponent } from './components/main-section/main-section.component';
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [MentorComponent, MainSectionComponent],
  imports: [MentorRouterModule, MatIconModule, CommonModule]
>>>>>>> dev
})
export class MentorModule { }
