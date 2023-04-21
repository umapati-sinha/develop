import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './base/base-layout/base-layout.component';

const routes: Routes = [

  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'forms', redirectTo: 'submissions' },
      { path: 'users', redirectTo: 'submissions' },
      { path: 'submissions', loadChildren: () => import('./modules/submissions/submissions.module').then(m => m.SubmissionsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
