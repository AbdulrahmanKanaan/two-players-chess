import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GameEvent, Move } from '../../types';
import { ChessEngineService } from '../chess-engine/chess-engine.service';
import { MessagesFactory } from './messages.factory';
import { GameEvents } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class MessagesService implements OnDestroy, OnInit {
  private moveListener?: Subscription;
  private eventsListener?: Subscription;

  private messageSubject: Subject<string> = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  private messagesFactory: MessagesFactory;

  constructor(private readonly chessEngine: ChessEngineService) {
    this.moveListener = this.chessEngine.move$.subscribe((move) =>
      this.handleMove(move)
    );
    this.eventsListener = this.chessEngine.events$.subscribe((event) =>
      this.handleEvent(event)
    );
    this.messagesFactory = new MessagesFactory(
      this.chessEngine.whiteName,
      this.chessEngine.blackName
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.moveListener?.unsubscribe();
    this.eventsListener?.unsubscribe();
  }

  private handleMove(move: Move) {
    const message = this.messagesFactory.getMessage(move);
    this.messageSubject.next(message);
  }

  private handleEvent(event: GameEvent) {
    const message = this.messagesFactory.getEventMessage(event);
    if (message) this.messageSubject.next(message);
  }
}
