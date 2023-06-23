import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFinishedDialogComponent } from './game-finished-dialog.component';

describe('GameFinishedDialogComponent', () => {
  let component: GameFinishedDialogComponent;
  let fixture: ComponentFixture<GameFinishedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameFinishedDialogComponent]
    });
    fixture = TestBed.createComponent(GameFinishedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
