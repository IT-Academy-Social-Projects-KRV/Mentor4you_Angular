import { NgModule } from '@angular/core';

import { MentorComponent } from './mentor.component';
import { MentorRouterModule } from './mentor-router.module';
import { MentorTopComponent } from './components/mentor-top/mentor-top.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [MentorComponent, MentorTopComponent],
    imports: [MentorRouterModule, NgSelectModule, FormsModule, CommonModule]
})
export class MentorModule { }
