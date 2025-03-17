import { TestBed } from '@angular/core/testing';

import { RetrieveProductsService } from './retrieve-products.service';

describe('RetrieveProductsService', () => {
  let service: RetrieveProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
