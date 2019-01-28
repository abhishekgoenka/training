import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  { path: 'dashboard', component: DashboardComponent},
  { path: 'entry/:id',  loadChildren: './data-entry/data-entry.module#DataEntryModule' },
  { path: 'entry', canActivate: [ AuthGuard ],  loadChildren: './data-entry/data-entry.module#DataEntryModule' },
  { path: 'entryreactive',  loadChildren: './data-entry-reactive/data-entry-reactive.module#DataEntryReactiveModule' },
  { path: 'report', loadChildren: './report/report.module#ReportModule' },
  { path: '**', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
