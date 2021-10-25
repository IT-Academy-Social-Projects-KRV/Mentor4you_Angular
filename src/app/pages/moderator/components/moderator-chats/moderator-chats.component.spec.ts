import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorChatsComponent } from './moderator-chats.component';

describe('ModeratorChatsComponent', () => {
  let component: ModeratorChatsComponent;
  let fixture: ComponentFixture<ModeratorChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
