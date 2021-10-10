import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { JwPaginationModule } from "jw-angular-pagination";

import {MentorRoutingModule} from './mentor-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {MentorComponent} from './mentor.component';
import {MentorTopComponent} from './components/mentor-top/mentor-top.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    MentorComponent,
    MentorTopComponent,

  ],
    imports: [
        SharedModule,
        MentorRoutingModule,
        JwPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
    ]
})

export class MentorModule {
}
