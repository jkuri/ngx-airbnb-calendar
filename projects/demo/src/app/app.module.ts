import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AirbnbCalendarModule } from 'airbnb-calendar';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, AirbnbCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
