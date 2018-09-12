import { TestBed, async, inject } from '@angular/core/testing';

import { ManagerGuardGuard } from './manager-guard.guard';

describe('ManagerGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerGuardGuard]
    });
  });

  it('should ...', inject([ManagerGuardGuard], (guard: ManagerGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
