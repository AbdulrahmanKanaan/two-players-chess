import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { actions } from 'src/app/constants';
import { ChessEngineService } from 'src/app/services/chess-engine.service';
import { Message, Move } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public whiteName: string = 'Player One';
  public blackName: string = 'Player Two';

  constructor(private readonly chessEngine: ChessEngineService) {}

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

  public handleMoveAction(move: Move) {
    this.chessEngine.move(move);
  }
}
