import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NesDialogService } from 'ngx-nes-css';
import { NamesDialogComponent } from 'src/app/components/names-dialog/names-dialog.component';
import { StorageKeys } from 'src/app/constants';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private oldGame: string = '';

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly dialogService: NesDialogService
  ) {
    this.oldGame = this.storageService.get(StorageKeys.CURRENT_GAME);
  }

  public get canLoadGame(): boolean {
    return !this.oldGame;
  }

  public onNewGameClick(): void {
    this.dialogService.open({
      component: NamesDialogComponent,
      data: {
        start: (whiteName: string, blackName: string) => {
          this.startNewGame(whiteName, blackName);
        },
      },
    });
  }

  private startNewGame(whiteName: string, blackName: string): void {
    this.storageService.del(StorageKeys.CURRENT_GAME);
    this.navigateToMainPage(whiteName, blackName);
  }

  public onLoadGameClick(): void {
    if (!this.oldGame) return;
    const { whiteName, blackName } = JSON.parse(this.oldGame);
    this.navigateToMainPage(whiteName, blackName);
  }

  private navigateToMainPage(whiteName: string, blackName: string): void {
    this.router.navigate(['mainpage'], {
      state: { whiteName, blackName },
    });
  }
}
