import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'login',
    loadChildren: () => import('./auth/signin/signin.module').then(m => m.SigninModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
