import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingVisualiserComponent } from './sorting-visualiser/sorting-visualiser.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'; 
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchingVisualiserComponent } from './searching-visualiser/searching-visualiser.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { PathFinderComponent } from './path-finder/path-finder.component';

let routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomePageComponent},
  {path:'sorting' , component: SortingVisualiserComponent},
  {path:'searching', component: SearchingVisualiserComponent},
  {path:'pathfinding',component:PathFinderComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualiserComponent,
    SearchingVisualiserComponent,
    HomePageComponent,
    PathFinderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    FontAwesomeModule,
    NgxGraphModule
  ],
  providers: [],
  bootstrap: [AppComponent , SortingVisualiserComponent]
})
export class AppModule { }
