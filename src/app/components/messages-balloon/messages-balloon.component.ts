import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-messages-balloon',
  templateUrl: './messages-balloon.component.html',
  styleUrls: ['./messages-balloon.component.scss'],
})
export class MessagesBalloonComponent implements OnDestroy {
  private messageSubscription?: Subscription;

  public message?: string;

  constructor(private readonly messagesService: MessagesService) {
    this.messageSubscription = this.messagesService.message$.subscribe(
      (message) => {
        this.message = message;
      }
    );
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }
}
