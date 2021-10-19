import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorBlackListComponent } from './moderator-black-list.component';

describe('ModeratorBlackListComponent', () => {
  let component: ModeratorBlackListComponent;
  let fixture: ComponentFixture<ModeratorBlackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorBlackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorBlackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
