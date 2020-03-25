import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', '../../css/logoBig.css']
})
export class MainPageComponent implements OnInit {

  isLogged = true;
  startGame = 'Szybka gra';
  logIn = 'Zaloguj się';
  playWithFriends = 'Zagraj ze znajomymi';
  createGame = 'Stwórz grę';
  yourProfile = 'Twój profil';

  gameUrl  = '/game';
  createGameUrl = '/createGame';
  profileUrl  = '/profile';
  logInLink = '/login';

  callBack(event) {
    console.log('callBack', event);
  }

  ngOnInit(): void {
  }
}
