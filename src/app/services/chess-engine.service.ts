import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Move } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ChessEngineService {
  private _pgn: string = '';
  private _fen: string = '';
  private _turn: string = 'white';
  private _moves: Move[] = [];

  private _whiteSubject: Subject<Move> = new Subject<Move>();
  private _blackSubject: Subject<Move> = new Subject<Move>();

  public white$ = this._whiteSubject.asObservable();
  public black$ = this._blackSubject.asObservable();

  constructor() {}

  public move(move: Move) {
    this._moves.push(move);
    this._pgn = move.pgn;
    this._fen = move.fen;
    const subject =
      this._turn === 'white' ? this._blackSubject : this._whiteSubject;
    subject.next(move);
    this._turn = this._turn === 'white' ? 'black' : 'white';
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

  public moveToObject(move: string): {
    from: string;
    to: string;
    promotion: string;
  } {
    const moveChunks: string[] = [];
    const chunkSize = 2;
    for (let i = 0; i < move.length; i += chunkSize) {
      moveChunks.push(move.slice(i, i + chunkSize));
    }
    const [from, to, promotion] = moveChunks;
    const promotions: Record<string, string> = {
      '1': 'q',
      '2': 'r',
      '3': 'b',
      '4': 'k',
    };
    return { from, to, promotion: promotions[promotion] };
  }
}
