import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTotalComponent } from './user-total.component';

describe('UserTotalComponent', () => {
  let component: UserTotalComponent;
  let fixture: ComponentFixture<UserTotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTotalComponent]
    });
    fixture = TestBed.createComponent(UserTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
