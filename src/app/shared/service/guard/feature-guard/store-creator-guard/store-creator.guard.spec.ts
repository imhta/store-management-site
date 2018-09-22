import {inject, TestBed} from '@angular/core/testing';

import {StoreCreatorGuard} from './store-creator.guard';

describe('StoreCreatorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreCreatorGuard]
    });
  });

  it('should ...', inject([StoreCreatorGuard], (guard: StoreCreatorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
