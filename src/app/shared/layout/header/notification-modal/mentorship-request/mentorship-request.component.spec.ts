import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipRequestComponent } from './mentorship-request.component';

describe('MentorshipRequestComponent', () => {
  let component: MentorshipRequestComponent;
  let fixture: ComponentFixture<MentorshipRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorshipRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
