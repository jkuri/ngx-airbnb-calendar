import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Calendar, Day, CalendarOptions, mergeCalendarOptions } from './airbnb-calendar.interface';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDate,
  getMonth,
  getYear,
  isToday,
  isSameDay,
  isSameMonth,
  isBefore,
  isAfter,
  format,
  addMonths,
  setDay
} from 'date-fns';

@Component({
  selector: 'airbnb-calendar',
  templateUrl: './airbnb-calendar.component.html',
  styleUrls: ['./airbnb-calendar.component.sass'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AirbnbCalendarComponent, multi: true }]
})
export class AirbnbCalendarComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: CalendarOptions = mergeCalendarOptions();

  private date: Date = new Date();
  private innerValue: string | null = null;
  private displayValue: string | null = null;

  calendar: Calendar;
  calendarNext: Calendar;

  get value(): string | null {
    return this.innerValue;
  }

  set value(val: string | null) {
    this.innerValue = val;
  }

  writeValue(val: string | null): void {
    this.innerValue = val;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  constructor(private elementRef: ElementRef) {
    const date = new Date(this.date.getTime());
    this.calendar = this.generateCalendar(date);
    this.calendarNext = this.generateCalendar(addMonths(date, 1));
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.options = mergeCalendarOptions(this.options);
    }
  }

  private generateCalendar(date: Date = new Date()): Calendar {
    const [start, end] = [startOfMonth(date), endOfMonth(date)];
    const days = eachDayOfInterval({ start, end }).map(d => {
      return {
        date: d,
        day: getDate(d),
        month: getMonth(d),
        year: getYear(d),
        isSameMonth: isSameMonth(d, start),
        isToday: isToday(d),
        isSelectable: true,
        isSelected: false
      };
    });

    let dayNames = [];
    const dayStart = this.options.firstCalendarDay || 0;
    for (let i = dayStart; i <= 6 + dayStart; i++) {
      const date = setDay(new Date(), i);
      dayNames.push(format(date, this.options.formatDays || 'eeeeee', { locale: this.options.locale }));
    }

    return {
      month: getMonth(date),
      year: getYear(date),
      title: format(date, this.options.formatTitle || 'MMMM uuuu'),
      days,
      dayNames
    };
  }
}
