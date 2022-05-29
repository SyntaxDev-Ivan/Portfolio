import { TestBed } from '@angular/core/testing';

import { ThemeGetterService } from './theme-getter.service';

describe('ThemeGetterService', () => {
  let service: ThemeGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
