import { TestBed } from '@angular/core/testing';

import { UniversalMicroAddService } from './universal-micro-add.service';

describe('UniversalMicroAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniversalMicroAddService = TestBed.get(UniversalMicroAddService);
    expect(service).toBeTruthy();
  });
});
