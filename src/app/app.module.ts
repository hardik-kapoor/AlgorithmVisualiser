import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingVisualiserComponent } from './sorting-visualiser/sorting-visualiser.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualiserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
