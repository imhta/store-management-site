import {inject, TestBed} from '@angular/core/testing';

import {SellingGuard} from './selling.guard';

describe('SellingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellingGuard]
    });
  });

  it('should ...', inject([SellingGuard], (guard: SellingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
