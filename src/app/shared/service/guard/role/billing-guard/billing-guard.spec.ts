import { TestBed, async, inject } from '@angular/core/testing';

import { BillingGuard } from './billing-guard';

describe('BillingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingGuard]
    });
  });

  it('should ...', inject([BillingGuard], (guard: BillingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
