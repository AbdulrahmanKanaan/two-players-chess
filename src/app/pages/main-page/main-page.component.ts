import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actions } from 'src/app/constants';
import { ChessEngineService } from 'src/app/services/chess-engine.service';
import { Message, Move } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit {
  public whiteName: string = 'Player One';
  public blackName: string = 'Player Two';

  constructor(
    private readonly chessEngine: ChessEngineService,
    private readonly router: Router
  ) {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState) {
      const { whiteName, blackName } = navigationState;
      this.whiteName = whiteName ?? this.whiteName;
      this.blackName = blackName ?? this.blackName;
      this.chessEngine.setPlayerNames(whiteName, blackName);
    }
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
}
