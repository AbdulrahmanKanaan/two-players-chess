import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesBalloonComponent } from './messages-balloon.component';

describe('MessagesBalloonComponent', () => {
  let component: MessagesBalloonComponent;
  let fixture: ComponentFixture<MessagesBalloonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesBalloonComponent]
    });
    fixture = TestBed.createComponent(MessagesBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
