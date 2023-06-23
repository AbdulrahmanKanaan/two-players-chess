import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NesDialogRef } from 'ngx-nes-css';
import { GameStatuses } from 'src/app/constants';

export type DialogDefaultParams = {
  canceled: () => void;
  confirmed: () => void;
  gameStatus: (typeof GameStatuses)[keyof typeof GameStatuses];
};

@Component({
  selector: 'app-game-finished-dialog',
  templateUrl: './game-finished-dialog.component.html',
  styleUrls: ['./game-finished-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFinishedDialogComponent {
  constructor(private readonly _dialogRef: NesDialogRef<DialogDefaultParams>) {}

  public get gameStatus(): (typeof GameStatuses)[keyof typeof GameStatuses] {
    return this._dialogRef.data?.gameStatus ?? GameStatuses.IN_PROGRESS;
  }

  public get message(): string {
    switch (this.gameStatus) {
      case GameStatuses.WHITE_WINS:
        return 'White won!';
      case GameStatuses.BLACK_WINS:
        return 'Black won!';
      case GameStatuses.DRAW:
        return 'Draw!';
      default:
        return '';
    }
  }

  onCancelClick(): void {
    console.log(123);
    // this._dialogRef.data?.canceled();
  }

  onConfirmClick(): void {
    this._dialogRef.data?.confirmed();
  }
}
