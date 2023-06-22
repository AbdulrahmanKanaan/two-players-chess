import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Observer, Subscription } from 'rxjs';
import { actions } from 'src/app/constants';
import { ChessEngineService } from 'src/app/services/chess-engine.service';
import { Message, Move } from 'src/app/types';
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

  @ViewChild('frame', { static: true })
  frame!: ElementRef<HTMLIFrameElement>;

  public iFrameUrl?: SafeResourceUrl;

  private moveObserver?: Subscription;

  ngOnInit(): void {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${environment.appUrl}/iframepage?color=${this.playerColor}`
    );
    const color = this.playerColor as 'white' | 'black';
    const moveObservable: Observable<Move> = this.chessEngine[`${color}$`];
    this.moveObserver = moveObservable.subscribe(this.moveListener.bind(this));
  }

  ngOnDestroy(): void {
    this.moveObserver?.unsubscribe();
  }

  private moveListener(move: Move) {
    const message: Message<Move> = {
      action: actions.MOVE,
      data: move,
    };
    this.frame.nativeElement.contentWindow?.postMessage(message, '*');
  }
}
