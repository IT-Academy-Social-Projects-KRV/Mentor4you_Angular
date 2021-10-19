import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorUserDetailsComponent } from './moderator-user-details.component';

describe('ModeratorUserDetailsComponent', () => {
  let component: ModeratorUserDetailsComponent;
  let fixture: ComponentFixture<ModeratorUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
