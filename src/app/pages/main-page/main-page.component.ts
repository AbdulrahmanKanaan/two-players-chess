import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { NesDialogService } from 'ngx-nes-css';
import { Subscription } from 'rxjs';
import { GameFinishedDialogComponent } from 'src/app/components/game-finished-dialog/game-finished-dialog.component';
import { GameEvents, GameStatuses, actions } from 'src/app/constants';
import { ChessEngineService } from 'src/app/services/chess-engine/chess-engine.service';
import { GameEvent, GameStatus, Message, Move } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit, OnDestroy {
  public gameStatus: GameStatus = GameStatuses.IN_PROGRESS;

  public get isFinished(): boolean {
    return this.gameStatus !== GameStatuses.IN_PROGRESS;
  }

  public whiteName: string = '';
  public blackName: string = '';

  private eventsSubscription?: Subscription;

  constructor(
    private readonly chessEngine: ChessEngineService,
    private readonly router: Router,
    private readonly dialogService: NesDialogService
  ) {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState) {
      const { whiteName, blackName } = navigationState;
      console.log(navigationState);
      this.whiteName = whiteName;
      this.blackName = blackName;
      this.chessEngine.setPlayerNames(whiteName, blackName);
    }
    this.eventsSubscription = this.chessEngine.events$.subscribe((event) =>
      this.gameEventsListener(event)
    );
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }

  @HostListener('window:message', ['$event'])
  public onMessage(event: MessageEvent<Message>) {
    if (!('action' in event.data)) return;

    const { action, data } = event.data;

    switch (action) {
      case actions.MOVE:
        this.handleMoveAction(data as Move);
        break;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    this.chessEngine.saveGame();
    return event;
  }

  ngAfterViewInit(): void {
    this.chessEngine.loadGame();
  }

  public handleMoveAction(move: Move) {
    this.chessEngine.move(move);
  }

  private gameEventsListener(event: GameEvent) {
    switch (event.name) {
      case GameEvents.GAME_FINISHED:
        this.handleGameFinished(event.data);
        break;
      case GameEvents.RESET_GAME:
        this.handleReset();
        break;
    }
  }

  private handleGameFinished(gameStatus: GameStatus) {
    this.gameStatus = gameStatus;
    const dialogRef = this.dialogService.open({
      component: GameFinishedDialogComponent,
      data: {
        gameStatus: this.gameStatus,
        startNewGame: () => {
          this.onResetClick();
          dialogRef.close();
        },
      },
    });
  }

  public handleReset(): void {
    this.gameStatus = GameStatuses.IN_PROGRESS;
  }

  public onResetClick(): void {
    this.chessEngine.resetGame();
  }

  onGoHomeClick() {
    if (this.chessEngine.pgn) this.chessEngine.saveGame();
    else this.chessEngine.resetGame();
    this.router.navigate(['/']);
  }
}
