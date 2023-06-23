import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';
import {
  GameEvents,
  GameStatuses,
  PlayerColors,
  StorageKeys,
} from '../../constants';
import { GameEvent, Move, SavedGame } from '../../types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChessEngineService {
  private _pgn: string = '';
  private _fen: string = '';
  private _turn: string = PlayerColors.WHITE;
  private _moves: Move[] = [];
  public whiteName: string = '';
  public blackName: string = '';

  private moveSubject: Subject<Move> = new Subject<Move>();
  public move$ = this.moveSubject.asObservable();

  public black$ = this.moveSubject
    .asObservable()
    .pipe(filter(() => this.turn === PlayerColors.WHITE));

  public white$ = this.moveSubject
    .asObservable()
    .pipe(filter(() => this.turn === PlayerColors.BLACK));

  private eventsSubject: Subject<GameEvent> = new Subject<GameEvent>();
  public events$ = this.eventsSubject.asObservable();

  constructor(private readonly storageService: StorageService) {}

  public move(move: Move) {
    this._moves.push(move);
    this._pgn = move.pgn;
    this._fen = move.fen;
    this.moveSubject.next(move);

    this.isGameOver(move) &&
      this.eventsSubject.next({
        name: GameEvents.GAME_FINISHED,
        data: this.gameStatus(move),
      });

    this._turn =
      this._turn === PlayerColors.WHITE
        ? PlayerColors.BLACK
        : PlayerColors.WHITE;
  }

  public get turn() {
    return this._turn;
  }

  public get pgn() {
    return this._pgn;
  }

  public set pgn(pgn: string) {
    this._pgn = pgn;
  }

  private isGameOver(move: Move): boolean {
    return move.checkmate || move.stalemate;
  }

  private gameStatus(move: Move): string {
    if (move.checkmate)
      return this._turn === PlayerColors.WHITE
        ? GameStatuses.WHITE_WINS
        : GameStatuses.BLACK_WINS;

    if (move.stalemate) return GameStatuses.DRAW;

    return GameStatuses.IN_PROGRESS;
  }

  public saveGame() {
    const date = new Date();

    const game: SavedGame = {
      pgn: this._pgn,
      fen: this._fen,
      whiteName: this.whiteName,
      blackName: this.blackName,
      turn: this.turn,
      date: date,
    };

    this.storageService.set(StorageKeys.CURRENT_GAME, JSON.stringify(game));
  }

  public loadGame() {
    const emptyGame: SavedGame = {
      pgn: '',
      fen: '',
      blackName: this.blackName,
      whiteName: this.whiteName,
      turn: PlayerColors.WHITE,
      date: new Date(),
    };

    const stringifiedGame = this.storageService.get(
      StorageKeys.CURRENT_GAME,
      emptyGame
    );

    const game = JSON.parse(stringifiedGame) as SavedGame;

    this.setPlayerNames(game.whiteName, game.blackName);
    this._fen = game.fen;
    this._pgn = game.pgn;
    this._turn = game.turn;

    // if old game exists fire event
    if (game.pgn) {
      this.eventsSubject.next({ name: GameEvents.LOAD_GAME, data: game });
    } else {
      this.eventsSubject.next({ name: GameEvents.NEW_GAME });
    }
  }

  public setPlayerNames(whiteName: string, blackName: string) {
    this.whiteName = whiteName;
    this.blackName = blackName;
  }

  public resetGame() {
    this._pgn = '';
    this._fen = '';
    this._turn = PlayerColors.WHITE;
    this._moves = [];
    this.storageService.del(StorageKeys.CURRENT_GAME);
    this.eventsSubject.next({ name: GameEvents.RESET_GAME });
  }
}
