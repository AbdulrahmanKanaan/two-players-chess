import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {
  @Input() isNewGameButtonVisible = false;
  @Output() newGameClick = new EventEmitter<void>();
  @Output() goHomeClick = new EventEmitter<void>();
  @Output() undoClick = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  newGame() {
    this.newGameClick.emit();
  }

  goHome() {
    this.goHomeClick.emit();
  }

  undo() {
    this.undoClick.emit();
  }
}
