import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataEntryReactiveRoutingModule } from './data-entry-reactive-routing.module';
import { DataEntryReactiveComponent } from './data-entry-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DataEntryReactiveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataEntryReactiveRoutingModule
  ]
})
export class DataEntryReactiveModule { }
