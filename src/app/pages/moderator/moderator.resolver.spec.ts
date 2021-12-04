import { TestBed } from '@angular/core/testing';

import { ModeratorResolver } from './moderator.resolver';

describe('ModeratorResolver', () => {
  let resolver: ModeratorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ModeratorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
