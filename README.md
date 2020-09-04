# AirbnbCalendar

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

And use `airbnb-calendar` directive on your `<input />`

```html
<input type="text" [(ngModel)]="value" airbnb-calendar />
```

## License

MIT
