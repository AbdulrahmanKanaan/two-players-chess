import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GameEvent, Move, SavedGame } from '../../types';
import { ChessEngineService } from '../chess-engine/chess-engine.service';
import { MessagesFactory } from './messages.factory';

@Injectable({
  providedIn: 'root',
})
export class MessagesService implements OnDestroy, OnInit {
  private moveListener?: Subscription;
  private eventsListener?: Subscription;

  private messageSubject: Subject<string> = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  constructor(
    private readonly chessEngine: ChessEngineService,
    private readonly messagesFactory: MessagesFactory
  ) {
    this.moveListener = this.chessEngine.move$.subscribe((move) =>
      this.handleMove(move)
    );
    this.eventsListener = this.chessEngine.events$.subscribe((event) =>
      this.handleEvent(event)
    );
    this.messagesFactory.setNames(
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

  private handleEvent(event: GameEvent<SavedGame>) {
    const { whiteName, blackName } = event.data ?? {};
    if (whiteName && blackName)
      this.messagesFactory.setNames(
        event.data?.whiteName!,
        event.data?.blackName!
      );
    const message = this.messagesFactory.getEventMessage(event);
    if (message) this.messageSubject.next(message);
  }
}
