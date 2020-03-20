import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameComponent } from './game-page/game.component';
import { MainPageComponent} from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
