import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportComponent } from './report/report.component';
import { DataEntryReactiveComponent } from './data-entry-reactive/data-entry-reactive.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/entry',
        pathMatch: 'full'
      },
      { path: 'entry/:id', component: DataEntryComponent },
      { path: 'entry', component: DataEntryComponent },
      { path: 'report', component: ReportComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
