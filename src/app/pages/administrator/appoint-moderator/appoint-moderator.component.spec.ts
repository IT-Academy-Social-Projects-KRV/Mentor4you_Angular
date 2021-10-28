import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointModeratorComponent } from './appoint-moderator.component';

describe('AppointModeratorComponent', () => {
  let component: AppointModeratorComponent;
  let fixture: ComponentFixture<AppointModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
