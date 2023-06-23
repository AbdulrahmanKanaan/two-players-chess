import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Move } from '../types';
import { ChessEngineService } from './chess-engine.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private moveListener?: Subscription;

  private messageSubject: Subject<string> = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  constructor(private readonly chessEngine: ChessEngineService) {
    this.moveListener = this.chessEngine.move$.subscribe((move) =>
      this.handleMove(move)
    );
  }

  private handleMove(move: Move) {
    if (move.checkmate) {
      this.messageSubject.next('Checkmate!');
    } else if (move.check) {
      this.messageSubject.next('Check!');
    } else if (move.stalemate) {
      this.messageSubject.next('Stalemate!');
    }
  }
}
