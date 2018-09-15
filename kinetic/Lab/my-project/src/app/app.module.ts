import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EpCoreModule } from '@epicor/kinetic';

import { AppComponent } from './app.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportComponent } from './report/report.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { DataEntryReactiveComponent } from './data-entry-reactive/data-entry-reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    DataEntryComponent,
    ReportComponent,
    DataEntryReactiveComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EpCoreModule
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
