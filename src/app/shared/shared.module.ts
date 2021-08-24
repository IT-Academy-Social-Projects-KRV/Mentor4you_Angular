import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { InMemoryDataService } from '../core';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class SharedModule { }
