import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColors } from './types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input('color') public color: ButtonColors;
  @Input('disabled') public disabled: boolean = false;

  @Output('onClick') public onClick: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  public onClickHandler(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
