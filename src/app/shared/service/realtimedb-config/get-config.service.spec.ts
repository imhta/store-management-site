import { TestBed } from '@angular/core/testing';

import { GetConfigService } from './get-config.service';

describe('GetConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetConfigService = TestBed.get(GetConfigService);
    expect(service).toBeTruthy();
  });
});
