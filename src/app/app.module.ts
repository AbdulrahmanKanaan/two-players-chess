import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IFramePageComponent } from './pages/iframe-page/iframe-page.component';
import { NesModule } from 'ngx-nes-css';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { BoardComponent } from './components/board/board.component';
import { GameFinishedDialogComponent } from './components/game-finished-dialog/game-finished-dialog.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { NamesDialogComponent } from './components/names-dialog/names-dialog.component';
import { FormsModule } from '@angular/forms';
import { MessagesBalloonComponent } from './components/messages-balloon/messages-balloon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPageComponent,
    IFramePageComponent,
    PlayerNameComponent,
    BoardComponent,
    GameFinishedDialogComponent,
    HeaderBarComponent,
    NamesDialogComponent,
    MessagesBalloonComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NesModule,
    NgxChessBoardModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
