import { TestBed, async, inject } from '@angular/core/testing';

import { DataentryGuard } from './dataentry-guard';

describe('DataentryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataentryGuard]
    });
  });

  it('should ...', inject([DataentryGuard], (guard: DataentryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
