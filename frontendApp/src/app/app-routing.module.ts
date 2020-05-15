import { NgModule } from '@angular/core';
import { GameComponent } from './game-page/game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { MyProfileStatisticsComponent } from './my-profile-statistics/my-profile-statistics.component';
import { CreateGamePageComponent } from './create-game-page/create-game-page.component';
import { PlayFriendsPageComponent } from './play-friends-page/play-friends-page.component';
import { GameFriendsPageComponent } from './game-friends-page/game-friends-page.component';
import { Page404Component } from './page404/page404.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'login', component: LogInPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'profile',
    component: MyProfilePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'friends',
    component: MyFriendsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'statistics',
    component: MyProfileStatisticsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'createGame',
    component: CreateGamePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'playWithFriends',
    component: PlayFriendsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gameWithFriends',
    component: GameFriendsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'management',
    component: AdminViewComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', component: MainPageComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
