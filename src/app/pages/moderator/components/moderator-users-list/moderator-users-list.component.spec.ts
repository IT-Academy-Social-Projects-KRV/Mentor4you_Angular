import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorUsersListComponent } from './moderator-users-list.component';

describe('ModeratorUsersListComponent', () => {
  let component: ModeratorUsersListComponent;
  let fixture: ComponentFixture<ModeratorUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
