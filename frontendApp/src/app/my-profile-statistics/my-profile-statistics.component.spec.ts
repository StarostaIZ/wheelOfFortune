import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileStatisticsComponent } from './my-profile-statistics.component';

describe('MyProfileStatisticsComponent', () => {
  let component: MyProfileStatisticsComponent;
  let fixture: ComponentFixture<MyProfileStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
