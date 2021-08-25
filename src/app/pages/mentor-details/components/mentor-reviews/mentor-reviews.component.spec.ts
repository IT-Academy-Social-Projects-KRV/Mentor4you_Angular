import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorReviewsComponent } from './mentor-reviews.component';

describe('MentorReviewsComponent', () => {
  let component: MentorReviewsComponent;
  let fixture: ComponentFixture<MentorReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
