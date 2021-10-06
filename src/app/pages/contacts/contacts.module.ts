import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SendFormComponent } from './send-form/send-form.component';
import { ContactsComponent } from './send-form/contacts/contacts.component';


@NgModule({
  declarations: [
    SendFormComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContactsModule { }
