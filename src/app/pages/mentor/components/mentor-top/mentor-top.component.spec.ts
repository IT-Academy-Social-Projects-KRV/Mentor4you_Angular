import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorTopComponent } from './mentor-top.component';

describe('MentorTopComponent', () => {
  let component: MentorTopComponent;
  let fixture: ComponentFixture<MentorTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
