import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';
import { GameEvents, GameStatuses, PlayerColors } from '../constants';
import { GameEvent, Move, SavedGame } from '../types';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChessEngineService {
  private _pgn: string = '';
  private _fen: string = '';
  private _turn: string = PlayerColors.WHITE;
  private _moves: Move[] = [];
  private whiteName: string = '';
  private blackName: string = '';

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
    const key = `${this.whiteName} vs. ${
      this.blackName
    } - ${date.toLocaleString()}`;
    this.storageService.set(key, JSON.stringify(game));
    this.storageService.set('currentGame', key);
  }

  public loadGame() {
    const currentGameKey = this.storageService.get('currentGame');
    if (!currentGameKey) return;
    const emptyGame: SavedGame = {
      pgn: '',
      fen: '',
      blackName: '',
      whiteName: '',
      turn: '',
      date: new Date(),
    };
    const stringifiedGame = this.storageService.get(currentGameKey, emptyGame);
    const game = JSON.parse(stringifiedGame) as SavedGame;
    // no game data to load
    if (!game.pgn) return;
    this.setPlayerNames(game.whiteName, game.blackName);
    this._fen = game.fen;
    this._pgn = game.pgn;
    this._turn = game.turn;
    this.eventsSubject.next({ name: GameEvents.LOAD_GAME, data: game });
  }

  public setPlayerNames(whiteName: string, blackName: string) {
    this.whiteName = whiteName;
    this.blackName = blackName;
  }
}
