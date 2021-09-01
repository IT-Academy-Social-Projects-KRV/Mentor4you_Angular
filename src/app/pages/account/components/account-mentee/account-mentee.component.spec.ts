import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenteeComponent } from './account-mentee.component';

describe('AccountMenteeComponent', () => {
  let component: AccountMenteeComponent;
  let fixture: ComponentFixture<AccountMenteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMenteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
