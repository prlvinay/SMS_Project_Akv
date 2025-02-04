import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsTrackingComponent } from './notifications-tracking.component';

describe('NotificationsTrackingComponent', () => {
  let component: NotificationsTrackingComponent;
  let fixture: ComponentFixture<NotificationsTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
