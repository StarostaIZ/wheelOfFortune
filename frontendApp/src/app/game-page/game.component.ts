import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import {isNull, log} from 'util';
import { falseIfMissing } from 'protractor/built/util';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: [
    '../../css/button.css',
    './game.component.css',
    '../../css/logoSmall.css',
  ],
})
export class GameComponent implements OnInit {
  entry = [];
  vowels = ['A', 'Ą', 'E', 'Ę', 'I', 'O', 'Ó', 'U', 'Y'];
  alphabet = [
    { value: 'A', clicked: false },
    { value: 'Ą', clicked: false },
    { value: 'B', clicked: false },
    { value: 'C', clicked: false },
    { value: 'Ć', clicked: false },
    { value: 'D', clicked: false },
    { value: 'E', clicked: false },
    { value: 'Ę', clicked: false },
    { value: 'F', clicked: false },
    { value: 'G', clicked: false },
    { value: 'H', clicked: false },
    { value: 'I', clicked: false },
    { value: 'J', clicked: false },
    { value: 'K', clicked: false },
    { value: 'L', clicked: false },
    { value: 'Ł', clicked: false },
    { value: 'M', clicked: false },
    { value: 'N', clicked: false },
    { value: 'Ń', clicked: false },
    { value: 'O', clicked: false },
    { value: 'Ó', clicked: false },
    { value: 'P', clicked: false },
    { value: 'Q', clicked: false },
    { value: 'R', clicked: false },
    { value: 'S', clicked: false },
    { value: 'Ś', clicked: false },
    { value: 'T', clicked: false },
    { value: 'U', clicked: false },
    { value: 'V', clicked: false },
    { value: 'W', clicked: false },
    { value: 'X', clicked: false },
    { value: 'Y', clicked: false },
    { value: 'Z', clicked: false },
    { value: 'Ź', clicked: false },
    { value: 'Ż', clicked: false },
  ];
  prizes = [
    '2500',
    '800',
    '200',
    '1000',
    'BANKRUT',
    '200',
    '800',
    '600',
    '500',
    '400',
    '1000',
    'BANKRUT',
  ];
  isDivineTour = false;
  category = 'SPORT';
  player = { name: '', score: 0 };
  prize = '0';
  divineLetterClicked = false;
  divinePasswordTour = false;
  infoWheel = 'Zakreć kołem';
  infoKeyboard = 'Wybierz literę';
  password = '';
  guess = '';
  emptySpaceIndexes = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.drawWord().subscribe(data => {
      // @ts-ignore
      this.password = data.data.word.toUpperCase();
      for (const letter of this.password) {
        this.entry.push({ value: letter, visible: false });
      }
      // @ts-ignore
      this.category = data.data.category;
      this.player.name =
        localStorage.getItem('username') !== null
          ? localStorage.getItem('username')
          : 'Player';
    });
    console.log(this.entry);
  }

  rotateWheel(event) {
    this.infoKeyboard = 'Wybierz literę';
    this.divinePasswordTour = false;
    this.divineLetterClicked = false;
    const wheel = event.target;
    wheel.style.pointerEvents = 'none';
    const deg = 720 + Math.floor(Math.random() * 270);
    wheel.style.transition = 'transform 5s cubic-bezier(.22,.99,.23,.99)';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.addEventListener('transitionend', () => {
      wheel.style.pointerEvents = 'auto';
      wheel.style.transition = 'none';
      let actualDeg = deg % 360;
      wheel.style.transform = `rotate(${actualDeg}deg`;
      actualDeg = actualDeg + 15;
      this.prize = this.prizes[Math.floor(actualDeg / 30)];
      if (this.prize === 'BANKRUT') {
        this.infoWheel = 'BANKRUT. Zakręć jeszcze raz';
        this.player.score = 0;
      } else {
        this.isDivineTour = true;
      }
    });
  }

  divine(event) {
    this.divineLetterClicked = true;
    const divineLetter = event.target.textContent.trim();
    if (this.vowels.includes(divineLetter)) {
      if(this.player.score < 200){
        this.infoKeyboard = `Samogłoska kosztuje 200. Nie masz wystarczającej liczby punktów.`;
      }
      else {
        let isClicked = true;
        console.log(this.alphabet)
        for (const letter of this.alphabet) {
          if (letter.value === divineLetter && letter.clicked === false) {
            letter.clicked = true;
            isClicked = false;
          }
        }
        if (!isClicked) {
          this.player.score -= 200;
          let counter = 0;
          this.entry.forEach(letter => {
            console.log(letter.value);
            console.log(divineLetter);
            if (letter.value === divineLetter) {
              letter.visible = true;
              counter++;
            }
          });
          if (counter > 0) {
            this.infoKeyboard = `Litera ${divineLetter} występuje ${counter} raz/razy.`;
          } else {
            this.infoWheel = `Brak litery ${divineLetter}.`;
            this.isDivineTour = false;
          }
        }
      }
    } else {
      let isClicked = true;
      for (const letter of this.alphabet) {
        if (letter.value === divineLetter && letter.clicked === false) {
          letter.clicked = true;
          isClicked = false;
        }
      }
      if (!isClicked) {
        let counter = 0;
        this.entry.forEach(letter => {
          console.log(letter.value);
          console.log(divineLetter);
          if (letter.value === divineLetter) {
            letter.visible = true;
            counter++;
          }
        });
        if (counter > 0) {
          this.infoWheel = `Litera ${divineLetter} występuje ${counter} raz/razy.`;
          this.player.score =
            this.player.score + counter * parseInt(this.prize);
        } else {
          this.infoWheel = `Brak litery ${divineLetter}.`;
        }
        this.isDivineTour = false;
      }
    }
    let isDone = true;

    this.entry.forEach(letter => {
      if (letter.visible === false && letter.value !== ' ') {
        isDone = false;
      }
    });
    console.log(this.entry);
    console.log(isDone);
    if(isDone){
      this.infoWheel = `Gratulację! Twój wynik to ${this.player.score}`;
    }
  }

  divinePassword() {
    this.divinePasswordTour = true;
  }

  saveGuess() {
    console.log(this.guess);
    if (this.guess.toUpperCase() === this.password) {
      this.infoWheel = `Gratulację! Twój wynik to ${this.player.score}`;
      this.entry.forEach(letter => {
        letter.visible = true;
      });
    } else {
      this.infoWheel = `Niestety hasło nie jest prawidłowe. Próbuj dalej.`;
    }
  }

  newGame() {
    this.entry = [];
    this.alphabet = [
      { value: 'A', clicked: false },
      { value: 'Ą', clicked: false },
      { value: 'B', clicked: false },
      { value: 'C', clicked: false },
      { value: 'Ć', clicked: false },
      { value: 'D', clicked: false },
      { value: 'E', clicked: false },
      { value: 'Ę', clicked: false },
      { value: 'F', clicked: false },
      { value: 'G', clicked: false },
      { value: 'H', clicked: false },
      { value: 'I', clicked: false },
      { value: 'J', clicked: false },
      { value: 'K', clicked: false },
      { value: 'L', clicked: false },
      { value: 'Ł', clicked: false },
      { value: 'M', clicked: false },
      { value: 'N', clicked: false },
      { value: 'Ń', clicked: false },
      { value: 'O', clicked: false },
      { value: 'Ó', clicked: false },
      { value: 'P', clicked: false },
      { value: 'Q', clicked: false },
      { value: 'R', clicked: false },
      { value: 'S', clicked: false },
      { value: 'Ś', clicked: false },
      { value: 'T', clicked: false },
      { value: 'U', clicked: false },
      { value: 'V', clicked: false },
      { value: 'W', clicked: false },
      { value: 'X', clicked: false },
      { value: 'Y', clicked: false },
      { value: 'Z', clicked: false },
      { value: 'Ź', clicked: false },
      { value: 'Ż', clicked: false },
    ];
    this.gameService.drawWord().subscribe(data => {
      // @ts-ignore
      this.password = data.data.word.toUpperCase();
      for (const letter of this.password) {
        this.entry.push({ value: letter, visible: false });
      }
      // @ts-ignore
      this.category = data.data.category;
    });

    this.prize = '0';
    this.player.score = 0
    this.divineLetterClicked = false;
    this.divinePasswordTour = false;
    this.infoWheel = 'Zakreć kołem';
    this.infoKeyboard = 'Wybierz literę';
  }
}
