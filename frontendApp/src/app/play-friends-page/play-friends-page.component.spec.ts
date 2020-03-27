import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFriendsPageComponent } from './play-friends-page.component';

describe('PlayFriendsPageComponent', () => {
  let component: PlayFriendsPageComponent;
  let fixture: ComponentFixture<PlayFriendsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayFriendsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
