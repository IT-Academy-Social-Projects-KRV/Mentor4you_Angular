import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFormComponent } from './send-form/send-form.component';

const routes: Routes = [{
  path: '',
  component: SendFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
