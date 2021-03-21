import { TestBed } from '@angular/core/testing';

import { ApiProvider } from './api.service';

describe('ApiProvider', () => {
  let service: ApiProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
