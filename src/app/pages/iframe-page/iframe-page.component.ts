import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MoveChange,
  NgxChessBoardComponent,
  NgxChessBoardService,
} from 'ngx-chess-board';
import { PlayerColors, actions } from 'src/app/constants';
import { Message, Move, SavedGame } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-iframe-page',
  templateUrl: './iframe-page.component.html',
  styleUrls: ['./iframe-page.component.scss'],
})
export class IFramePageComponent implements OnInit {
  public readonly PlayerColors = PlayerColors;

  public color: string = '';

  @ViewChild('board', { static: true }) board!: NgxChessBoardComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ngxChessService: NgxChessBoardService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.color = params['color'];
      this.color === PlayerColors.BLACK && this.board.reverse();
    });
  }

  private isLoadingState: boolean = false;

  @HostListener('window:message', ['$event'])
  public onMessage(event: MessageEvent<Message>) {
    const { action, data } = event.data;
    this.isLoadingState = true;
    switch (action) {
      case actions.MOVE:
        this.board.move(data.move);
        break;
      case actions.LOAD:
        this.loadGame(data);
        break;
      case actions.RESET:
        this.onReset();
        break;
      default:
        console.log('Unknown channel');
    }
    this.isLoadingState = false;
  }

  public onMove(event: any) {
    // prevent hook from firing if it is loading an old game or from updating state after other color plays
    if (this.isLoadingState) return;

    const move: Move = {
      move: event.move,
      check: event.check,
      stalemate: event.stalemate,
      checkmate: event.checkmate,
      fen: event.fen,
      pgn: event.pgn.pgn,
      isKill: event.x,
      piece: event.piece,
    };

    const message: Message<Move> = {
      action: actions.MOVE,
      data: move,
    };

    window.parent.postMessage(message, `${environment.appUrl}`);
  }

  private loadGame(game: SavedGame) {
    this.board.setPGN(game.pgn);
    this.color === PlayerColors.BLACK && this.board.reverse();
  }

  public onReset() {
    this.board.reset();
    this.ngxChessService.reset();
    this.color === PlayerColors.BLACK && this.board.reverse();
  }
}
