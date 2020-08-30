import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AirbnbCalendarModule } from 'airbnb-calendar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AirbnbCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
