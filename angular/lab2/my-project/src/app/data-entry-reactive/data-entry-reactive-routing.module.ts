import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEntryReactiveComponent } from './data-entry-reactive.component';

const routes: Routes = [  {
  path: '',
  component: DataEntryReactiveComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataEntryReactiveRoutingModule { }
