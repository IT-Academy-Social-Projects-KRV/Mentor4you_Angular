import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgSelectModule } from '@ng-select/ng-select';

import { MaterialModule } from './material/material.module';
import { InMemoryDataService } from '../core';

@NgModule({
  // imports: [HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  declarations: [],
})
export class SharedModule { }
