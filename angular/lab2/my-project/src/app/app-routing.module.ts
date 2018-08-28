import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportComponent } from './report/report.component';
import { DataEntryReactiveComponent } from './data-entry-reactive/data-entry-reactive.component';

const routes =  [
    {
      path: '',
      redirectTo: '/entry',
      pathMatch: 'full'
    },
    { path: 'entry', component: DataEntryReactiveComponent },
    { path: 'report', component: ReportComponent }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


