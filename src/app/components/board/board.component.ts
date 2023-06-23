import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { GameEvents, PlayerColors, actions } from 'src/app/constants';
import { ChessEngineService } from 'src/app/services/chess-engine.service';
import {
  GameEvent,
  Message,
  Move,
  PlayerColor,
  SavedGame,
} from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly chessEngine: ChessEngineService
  ) {}

  @Input({ required: true }) public playerName: string = '';
  @Input({ required: true }) public playerColor: string = '';

  @ViewChild('frame')
  private frame!: ElementRef<HTMLIFrameElement>;

  public iFrameUrl?: SafeResourceUrl;

  private moveObserver?: Subscription;
  private gameEventsObserver?: Subscription;

  ngOnInit(): void {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${environment.appUrl}/iframepage?color=${this.playerColor}`
    );

    const color = this.playerColor as PlayerColor;
    const moveObservable: Observable<Move> = this.chessEngine[`${color}$`];
    this.moveObserver = moveObservable.subscribe((move) =>
      this.moveListener(move)
    );

    this.gameEventsObserver = this.chessEngine.events$.subscribe((event) =>
      this.gameEventsListener(event)
    );
  }

  ngOnDestroy(): void {
    this.moveObserver?.unsubscribe();
    this.gameEventsObserver?.unsubscribe();
  }

  private postMessage<T>(message: Message<T>) {
    this.frame.nativeElement.contentWindow?.postMessage(message, '*');
  }

  private moveListener(move: Move) {
    const message: Message<Move> = {
      action: actions.MOVE,
      data: move,
    };
    this.postMessage(message);
  }

  private gameEventsListener(event: GameEvent) {
    switch (event.name) {
      case GameEvents.LOAD_GAME:
        this.loadGame(event.data);
        break;
      case GameEvents.RESET_GAME:
        this.postMessage({ action: actions.RESET });
        break;
    }
  }

  private loadGame(game: SavedGame) {
    this.playerName =
      this.playerColor === PlayerColors.WHITE ? game.whiteName : game.blackName;
    this.frame.nativeElement.onload = () =>
      this.postMessage({ action: actions.LOAD, data: game });
  }
}
