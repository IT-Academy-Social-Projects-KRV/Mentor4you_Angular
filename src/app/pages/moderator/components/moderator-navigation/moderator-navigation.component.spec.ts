import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorNavigationComponent } from './moderator-navigation.component';

describe('ModeratorNavigationComponent', () => {
  let component: ModeratorNavigationComponent;
  let fixture: ComponentFixture<ModeratorNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
