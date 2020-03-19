import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  startGame = 'Szybka gra';
  logIn = 'Zaloguj się';

  callBack(event) {
    console.log('callBack', event);
  }
}
