import { TestBed } from '@angular/core/testing';

import { AirbnbCalendarService } from './airbnb-calendar.service';

describe('AirbnbCalendarService', () => {
  let service: AirbnbCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirbnbCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
