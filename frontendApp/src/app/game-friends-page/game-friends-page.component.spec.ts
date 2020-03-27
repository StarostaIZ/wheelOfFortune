import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFriendsPageComponent } from './game-friends-page.component';

describe('GameFriendsPageComponent', () => {
  let component: GameFriendsPageComponent;
  let fixture: ComponentFixture<GameFriendsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFriendsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
