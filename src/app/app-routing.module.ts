import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
  {
    path: 'mentor',
    loadChildren: () => import('./pages/mentor/mentor.module').then(m => m.MentorModule)
  },
  {
    path: 'terms',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
