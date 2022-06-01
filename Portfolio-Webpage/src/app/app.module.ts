import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { IchComponent } from './ich/ich.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxDomarrowModule } from 'ngx-domarrow';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDomarrowModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  //create new html element schema
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class AppModule { }
