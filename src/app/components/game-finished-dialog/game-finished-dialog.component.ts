import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NesDialogRef } from 'ngx-nes-css';
import { GameStatuses } from 'src/app/constants';
import { GameStatus } from 'src/app/types';

export type DialogDefaultParams = {
  startNewGame: () => void;
  gameStatus: GameStatus;
};

@Component({
  selector: 'app-game-finished-dialog',
  templateUrl: './game-finished-dialog.component.html',
  styleUrls: ['./game-finished-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFinishedDialogComponent {
  constructor(private readonly _dialogRef: NesDialogRef<DialogDefaultParams>) {}

  public get gameStatus(): GameStatus {
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

  onNewGameClick(): void {
    this._dialogRef.data?.startNewGame();
  }
}
