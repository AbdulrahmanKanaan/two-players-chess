import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IFramePageComponent } from './pages/iframe-page/iframe-page.component';
import { NesModule } from 'ngx-nes-css';
import { ButtonComponent } from './components/button/button.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPageComponent,
    IFramePageComponent,
    ButtonComponent,
    PlayerNameComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NesModule,
    NgxChessBoardModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
