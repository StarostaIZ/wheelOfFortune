import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameComponent } from './game-page/game.component';
import { MainPageComponent} from './main-page/main-page.component';
import { LogInPageComponent} from './log-in-page/log-in-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'game', component: GameComponent },
  { path: 'login', component: LogInPageComponent },
  { path: 'register', component: RegisterPageComponent },
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
