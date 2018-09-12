import { TestBed, async, inject } from '@angular/core/testing';

import { BillingGuardGuard } from './billing-guard.guard';

describe('BillingGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingGuardGuard]
    });
  });

  it('should ...', inject([BillingGuardGuard], (guard: BillingGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
