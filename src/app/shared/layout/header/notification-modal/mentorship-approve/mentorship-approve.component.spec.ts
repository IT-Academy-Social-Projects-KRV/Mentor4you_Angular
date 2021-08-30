import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipApproveComponent } from './mentorship-approve.component';

describe('MentorshipApproveComponent', () => {
  let component: MentorshipApproveComponent;
  let fixture: ComponentFixture<MentorshipApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorshipApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
