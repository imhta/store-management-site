import { TestBed, async, inject } from '@angular/core/testing';

import { DataentryGuardGuard } from './dataentry-guard.guard';

describe('DataentryGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataentryGuardGuard]
    });
  });

  it('should ...', inject([DataentryGuardGuard], (guard: DataentryGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
