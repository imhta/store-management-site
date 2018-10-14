import {inject, TestBed} from '@angular/core/testing';

import {AddProductGuard} from './add-product.guard';

describe('AddProductGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProductGuard]
    });
  });

  it('should ...', inject([AddProductGuard], (guard: AddProductGuard) => {
    expect(guard).toBeTruthy();
  }));
});
