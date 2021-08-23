import { TestBed } from '@angular/core/testing';

import { MentorTopService } from './mentor-top.service';

describe('MentorTopService', () => {
  let service: MentorTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
