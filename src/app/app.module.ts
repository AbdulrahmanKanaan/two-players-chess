import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IFramePageComponent } from './pages/iframe-page/iframe-page.component';
import { NesModule } from 'ngx-nes-css';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPageComponent,
    IFramePageComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
