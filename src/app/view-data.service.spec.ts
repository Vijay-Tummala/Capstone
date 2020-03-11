import { TestBed, inject } from '@angular/core/testing';

import { ViewDataService } from './view-data.service';

describe('ViewDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewDataService]
    });
  });

  it('should be created', inject([ViewDataService], (service: ViewDataService) => {
    expect(service).toBeTruthy();
  }));
});
