import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMentorComponent } from './account-mentor.component';

describe('AccountMentorComponent', () => {
  let component: AccountMentorComponent;
  let fixture: ComponentFixture<AccountMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
