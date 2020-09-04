import { Component } from '@angular/core';
import { CalendarOptions } from 'airbnb-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  date: string | null = null;
  options: CalendarOptions = {
    firstCalendarDay: 1,
    format: 'LL/dd/yyyy'
  };
}
