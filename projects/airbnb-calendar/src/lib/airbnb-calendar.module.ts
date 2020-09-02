import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirbnbCalendarComponent } from './airbnb-calendar.component';

@NgModule({
  declarations: [AirbnbCalendarComponent],
  imports: [CommonModule],
  exports: [AirbnbCalendarComponent]
})
export class AirbnbCalendarModule {}
