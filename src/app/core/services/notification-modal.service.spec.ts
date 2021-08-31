import { TestBed } from '@angular/core/testing';

import { NotificationModalService } from './notification-modal.service';

describe('NotificationModalService', () => {
  let service: NotificationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
