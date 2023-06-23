import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NesDialogRef, NesDialogService } from 'ngx-nes-css';

export type DialogDefaultParams = {
  start: (whiteName: string, blackName: string) => void;
};

@Component({
  selector: 'app-names-dialog',
  templateUrl: './names-dialog.component.html',
  styleUrls: ['./names-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamesDialogComponent {
  public whiteName: string = '';
  public blackName: string = '';

  constructor(private readonly dialogRef: NesDialogRef<DialogDefaultParams>) {}

  onStartClick(): void {
    this.dialogRef.data?.start(this.whiteName, this.blackName);
    this.dialogRef.close();
  }
}
