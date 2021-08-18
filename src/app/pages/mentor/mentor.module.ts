import { NgModule } from '@angular/core';

import { MentorComponent } from './mentor.component';
import { MentorRouterModule } from './mentor-router.module';
import { MainSectionComponent } from './components/main-section/main-section.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [MentorComponent, MainSectionComponent],
    imports: [MentorRouterModule, MatIconModule]
})
export class MentorModule { }
