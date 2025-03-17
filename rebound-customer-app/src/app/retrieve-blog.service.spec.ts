import { TestBed } from '@angular/core/testing';

import { RetrieveBlogService } from './retrieve-blog.service';

describe('RetrieveBlogService', () => {
  let service: RetrieveBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
