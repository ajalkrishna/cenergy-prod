import { TestBed } from '@angular/core/testing';

import { ConsumptionApiService } from './consumption-api.service';

describe('ConsumptionApiService', () => {
  let service: ConsumptionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
