import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly storageService: StorageService
  ) {
    this.oldGame = this.storageService.get(StorageKeys.CURRENT_GAME);
  }

  public get canLoadGame(): boolean {
    return !this.oldGame;
  }

  public onNewGameClick(): void {
    this.storageService.del(StorageKeys.CURRENT_GAME);
    this.router.navigate(['mainpage'], {
      state: { whiteName: 'Mazen', blackName: 'Mezo' },
    });
  }

  public onLoadGameClick(): void {
    this.router.navigate(['mainpage']);
  }
}
