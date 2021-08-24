import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsCardsComponent } from './mentors-cards.component';

describe('MentorsCardsComponent', () => {
  let component: MentorsCardsComponent;
  let fixture: ComponentFixture<MentorsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
