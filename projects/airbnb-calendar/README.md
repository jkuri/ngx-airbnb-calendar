# AirbnbCalendar

You can find online running demo [here](https://codesandbox.io/s/ngx-airbnb-calendar-m556t).

## Usage

Install or add via `ng`

```sh
ng add ngx-airbnb-calendar
```

Then add `AirbnbCalendarModule` into your `AppModule`

```ts
import { AirbnbCalendarModule } from 'ngx-airbnb-calendar';

@NgModule({
  imports: [BrowserModule, AirbnbCalendarModule],
  declarations: [AppComponent]
})
export class AppModule {}
```

Set options in your component:

```ts
import { Component } from '@angular/core';
import { CalendarOptions } from 'ngx-airbnb-calendar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  options: CalendarOptions = {
    firstCalendarDay: 1,
    format: 'dd-LL-yyyy'
  };
}
```

And use `airbnb-calendar` directive on your `<input />`

```html
<input type="text" [(ngModel)]="value" airbnb-calendar [options]="options" />
```

### Available Options

| **Option**       | **Description**                                                             | **Value Type** | **Default Value** |
| ---------------- | --------------------------------------------------------------------------- | -------------- | ----------------- |
| minDate          | Minimum date available for selection                                        | Date           | null              |
| maxDate          | Maximum date available for selection                                        | Date           | null              |
| minYear          | Minimal shown year in calendar                                              | number         | null              |
| maxYear          | Maximum shown year in calendar                                              | number         | null              |
| format           | `date-fns` format used to generate ngModel value                            | string         | yyyy/LL/dd        |
| formatTitle      | `date-fns` format used to display month and year in calendar controls       | string         | MMMM uuuu         |
| formatDays       | `date-fns` format used to display day names in calendar header              | string         | eeeeee            |
| firstCalendarDay | Options to configure first day in calendar, ie 0 for Sunday or 1 for Monday | number         | 0                 |
| locale           | `date-fns` locale for days and months translation                           | Locale         | enUS              |
| closeOnSelected  | Option enables auto close calendar on date range selection                  | boolean        | false             |

## License

MIT
