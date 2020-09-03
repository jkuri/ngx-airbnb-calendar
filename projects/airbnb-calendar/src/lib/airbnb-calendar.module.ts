import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AirbnbCalendarComponent } from './airbnb-calendar.component';
import { AirbnbCalendarDirective } from './airbnb-calendar.directive';

@NgModule({
  declarations: [AirbnbCalendarComponent, AirbnbCalendarDirective],
  imports: [CommonModule, FormsModule],
  exports: [AirbnbCalendarComponent, AirbnbCalendarDirective],
  entryComponents: [AirbnbCalendarComponent]
})
export class AirbnbCalendarModule {}
