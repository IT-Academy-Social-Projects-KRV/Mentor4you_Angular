import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedUsersItemComponent } from './banned-users-item.component';

describe('BannedUsersItemComponent', () => {
  let component: BannedUsersItemComponent;
  let fixture: ComponentFixture<BannedUsersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedUsersItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedUsersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
