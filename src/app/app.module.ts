import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingVisualiserComponent } from './sorting-visualiser/sorting-visualiser.component';
import {RouterModule} from '@angular/router';


let routes = [
  {path:'sorting' , component: SortingVisualiserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualiserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
