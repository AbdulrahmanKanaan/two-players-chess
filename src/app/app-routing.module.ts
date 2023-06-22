import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IFramePageComponent } from './pages/iframe-page/iframe-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: 'iframepage', component: IFramePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
