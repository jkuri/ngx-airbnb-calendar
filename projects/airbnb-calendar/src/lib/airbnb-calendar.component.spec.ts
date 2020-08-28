import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirbnbCalendarComponent } from './airbnb-calendar.component';

describe('AirbnbCalendarComponent', () => {
  let component: AirbnbCalendarComponent;
  let fixture: ComponentFixture<AirbnbCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirbnbCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirbnbCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
