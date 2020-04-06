import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './game-page/game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { MyProfileStatisticsComponent } from './my-profile-statistics/my-profile-statistics.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CreateGamePageComponent } from './create-game-page/create-game-page.component';
import { PlayFriendsPageComponent } from './play-friends-page/play-friends-page.component';
import { GameFriendsPageComponent } from './game-friends-page/game-friends-page.component';
import { Page404Component } from './page404/page404.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { GameService} from "./services/game.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GameComponent,
    MainPageComponent,
    LogInPageComponent,
    RegisterPageComponent,
    MyProfilePageComponent,
    MyProfileStatisticsComponent,
    MyFriendsComponent,
    CreateGamePageComponent,
    PlayFriendsPageComponent,
    GameFriendsPageComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [ValidateService, AuthService, UserService, AuthGuardService, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
