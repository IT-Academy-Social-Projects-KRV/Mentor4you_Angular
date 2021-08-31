import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { MessagesComponent } from './pages/messages/messages.component';

import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
  {
    path: 'mentor',
    loadChildren: () => import('./pages/mentor/mentor.module').then(m => m.MentorModule)
  },
  {
    path: 'mentor-details',
    loadChildren: () => import('./pages/mentor-details/mentor-details.module').then(m => m.MentorDetailsModule)
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
