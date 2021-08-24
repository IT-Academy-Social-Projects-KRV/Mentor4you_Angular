import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorAddREviewSectionComponent } from './mentor-add-review-section.component';

describe('MentorAddREviewSectionComponent', () => {
  let component: MentorAddREviewSectionComponent;
  let fixture: ComponentFixture<MentorAddREviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorAddREviewSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorAddREviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
