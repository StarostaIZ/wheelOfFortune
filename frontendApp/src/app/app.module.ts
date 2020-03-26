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
import { HttpClientModule } from '@angular/common/http';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { MyProfileStatisticsComponent } from './my-profile-statistics/my-profile-statistics.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
