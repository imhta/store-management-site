import { TestBed, async, inject } from '@angular/core/testing';

import { RegisterGuardGuard } from './register-guard.guard';

describe('RegisterGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterGuardGuard]
    });
  });

  it('should ...', inject([RegisterGuardGuard], (guard: RegisterGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
