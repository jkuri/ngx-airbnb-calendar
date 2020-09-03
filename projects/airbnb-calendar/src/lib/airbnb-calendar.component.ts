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
import { Calendar, CalendarOptions, mergeCalendarOptions, Day } from './airbnb-calendar.interface';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDate,
  getMonth,
  getYear,
  isToday,
  isSameMonth,
  format,
  addMonths,
  setDay,
  getDay,
  subDays,
  subMonths,
  isAfter,
  isBefore,
  setHours,
  isSameDay,
  setMinutes,
  setSeconds
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
  fromToDate: { from: Date | null; to: Date | null } = { from: null, to: null };

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

  selectDay(index: number, calendar: 'primary' | 'secondary'): void {
    const cal = calendar === 'primary' ? this.calendar : this.calendarNext;
    if (!this.fromToDate.from) {
      this.fromToDate.from = cal.days[index].date;
    } else if (!!this.fromToDate.from && !this.fromToDate.to) {
      this.fromToDate.to = cal.days[index].date;
    } else if (!!this.fromToDate.to) {
      this.fromToDate = { from: cal.days[index].date, to: null };
    }

    this.calendar.days = this.calendar.days.map((d: Day) => {
      return {
        ...d,
        ...{
          isIncluded:
            isAfter(d.date, this.fromToDate.from || new Date()) && isBefore(d.date, this.fromToDate.to || new Date())
        }
      };
    });

    // this.calendarNext.days = this.calendar.days.map((d: Day) => {
    //   return {
    //     ...d,
    //     ...{
    //       isIncluded:
    //         isAfter(d.date, this.fromToDate.from || new Date()) && isBefore(d.date, this.fromToDate.to || new Date())
    //     }
    //   };
    // });
  }

  nextMonth(): void {
    this.date = addMonths(this.date, 1);
    const date = new Date(this.date.getTime());
    this.calendar = this.generateCalendar(date);
    this.calendarNext = this.generateCalendar(addMonths(date, 1));
  }

  prevMonth(): void {
    this.date = subMonths(this.date, 1);
    const date = new Date(this.date.getTime());
    this.calendar = this.generateCalendar(date);
    this.calendarNext = this.generateCalendar(addMonths(date, 1));
  }

  private generateCalendar(date: Date = new Date()): Calendar {
    const [start, end, now] = [
      setHours(startOfMonth(date), 0),
      setHours(endOfMonth(date), 0),
      setSeconds(setMinutes(setHours(new Date(), 0), 0), 0)
    ];
    const days: Day[] = eachDayOfInterval({ start, end })
      .map(d => {
        d = setSeconds(setMinutes(setHours(d, 0), 0), 0);
        return {
          date: d,
          day: getDate(d),
          month: getMonth(d),
          year: getYear(d),
          isSameMonth: isSameMonth(d, start),
          isToday: isToday(d),
          isSelectable: isBefore(now, d) || isSameDay(now, d),
          isSelected: false,
          isVisible: true,
          isIncluded: isAfter(d, this.fromToDate.from || new Date()) && isBefore(d, this.fromToDate.to || new Date())
        };
      })
      .reduce((acc: Day[], curr: Day, index: number, arr: Day[]) => {
        const first = this.options.firstCalendarDay || 0;
        const tmp = getDay(start) - first;

        if (arr.length - 1 === index) {
          acc.unshift(
            ...[...new Array(tmp)].map((_, i) => {
              const curr = setSeconds(setMinutes(setHours(subDays(start, i + 1), 0), 0), 0);
              return {
                date: curr,
                day: getDate(curr),
                month: getMonth(curr),
                year: getYear(curr),
                isSameMonth: false,
                isToday: false,
                isSelectable: false,
                isSelected: false,
                isVisible: !!this.options.showPreviousDays,
                isIncluded:
                  isAfter(curr, this.fromToDate.from || new Date()) && isBefore(curr, this.fromToDate.to || new Date())
              };
            })
          );
        }

        return acc.concat(curr);
      }, [])
      .sort((a, b) => (a.date >= b.date ? 1 : -1));

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
