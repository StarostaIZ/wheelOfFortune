import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { GameService } from '../services/game.service';
import { RoomsService } from '../services/rooms.service';
import {log} from "util";

@Component({
  selector: 'app-game-friends-page',
  templateUrl: './game-friends-page.component.html',
  styleUrls: [
    './game-friends-page.component.css',
    '../../css/button.css',
    '../../css/logoSmall.css',
  ],
})
export class GameFriendsPageComponent implements OnInit, AfterViewChecked  {
  chatMessage: string;
  messages = [];
  entry = [];
  entry_copy = [];
  VOWELS = ['A', 'Ą', 'E', 'Ę', 'I', 'O', 'Ó', 'U', 'Y'];
  ALPHABET = [
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
  alphabet = this.ALPHABET;
  PRIZES = [
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
  divinePasswordTour = false;
  infoWheel = 'Zakręć kołem';
  infoKeyboard = 'Wybierz literę';
  password = '';
  gameEnd = false;
  isLoading = true;
  roomID;
  eventSource;
  wheel;

  constructor(
    private gameService: GameService,
    private roomsService: RoomsService
  ) {}

  ngOnInit(): void {

    console.log(this.wheel)
    this.roomID = localStorage.getItem('roomID');
    this.gameService.getServerSendEvent(`http://localhost:3000/.well-known/mercure?topic=gameInfo/${this.roomID}`).subscribe(data => {
      // @ts-ignore
      console.log(data.data);
      // @ts-ignore
      const angle = JSON.parse(data.data).angle;
      console.log(angle);
      // @ts-ignore
      this.rotate(angle)
    })
    // const url = new URL('http://localhost:3000/.well-known/mercure');
    // url.searchParams.append('topic', `/roomInfo/${this.roomID}`);
    // url.searchParams.append('topic', `/gameInfo/${this.roomID}`);
    //
    // // @ts-ignore
    // this.eventSource = new EventSource(url);
    // this.eventSource.onmessage = event => {
    //   console.log(JSON.parse(event.data));
    // };
    // console.log(this.eventSource)

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
    this.isLoading = false;

  }

  ngAfterViewChecked():void{
    this.wheel = document.querySelector('#wheel');
  }

  rotate(deg){
    this.wheel.style.transition = 'transform 5s cubic-bezier(.22,.99,.23,.99)';
    this.wheel.style.transform = `rotate(${deg}deg)`;
    this.wheel.addEventListener('transitionend', () => {
      this.wheel.style.pointerEvents = 'auto';
      this.wheel.style.transition = 'none';
      let actualDeg = deg % 360;
      this.wheel.style.transform = `rotate(${actualDeg}deg`;
      actualDeg = actualDeg + 15;
      this.prize = this.PRIZES[Math.floor(actualDeg / 30)];
      if (this.prize === 'BANKRUT') {
        this.infoWheel = 'BANKRUT. Zakręć jeszcze raz';
        this.player.score = 0;
      } else {}
    });
  }

  rotateWheel(event) {
    this.infoKeyboard = 'Wybierz literę';
    const wheel = event.target;
    wheel.style.pointerEvents = 'none';
    const deg = 720 + Math.floor(Math.random() * 270);
    this.gameService.spin(deg).subscribe();
    wheel.style.transition = 'transform 5s cubic-bezier(.22,.99,.23,.99)';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.addEventListener('transitionend', () => {
      wheel.style.pointerEvents = 'auto';
      wheel.style.transition = 'none';
      let actualDeg = deg % 360;
      wheel.style.transform = `rotate(${actualDeg}deg`;
      actualDeg = actualDeg + 15;
      this.prize = this.PRIZES[Math.floor(actualDeg / 30)];
      if (this.prize === 'BANKRUT') {
        this.infoWheel = 'BANKRUT. Zakręć jeszcze raz';
        this.player.score = 0;
      } else {
        this.isDivineTour = true;
      }
    });
  }

  isLetterAlreadyClicked(divinedLetter) {
    for (const letter of this.alphabet) {
      if (letter.value === divinedLetter && letter.clicked === false) {
        letter.clicked = true;
        return false;
      }
    }
    return true;
  }

  countLetterInEntry(divinedLetter) {
    let counter = 0;
    const indexes = [];
    const letterBoxes = document.body.querySelectorAll('.entry_box');
    this.entry.forEach((letter, index) => {
      if (letter.value === divinedLetter) {
        letterBoxes[index].classList.add('entry_letter--active');
        indexes.push(index);
        counter++;
      }
    });

    indexes.forEach((value, index) => {
      setTimeout(() => {
        letterBoxes[value].classList.remove('entry_letter--active');
        letterBoxes[value].classList.add('flip');
        setTimeout(() => {
          this.entry[value].visible = true;
        }, 400);
      }, 600 + index * 800);
    });
    return counter;
  }

  isCompleted() {
    for (const letter of this.entry) {
      if (letter.visible === false && letter.value !== ' ') {
        return false;
      }
    }
    return true;
  }

  divine(event) {
    if (this.gameEnd) return;
    const divinedLetter = event.target.textContent.trim();
    this.gameService.divineLetter(divinedLetter)
    if (this.divinePasswordTour) {
      const empty_letter = this.entry.find(letter => {
        return letter.visible === false && letter.value !== ' ';
      });
      if (empty_letter) {
        empty_letter.value = divinedLetter;
        empty_letter.visible = true;
      }
    } else {
      let isVowel = false;
      if (this.VOWELS.includes(divinedLetter)) {
        isVowel = true;
      }
      if (isVowel) {
        if (this.player.score < 200) {
          this.infoKeyboard = `Samogłoska kosztuje 200. Nie masz wystarczającej liczby punktów.`;
          return;
        } else {
          this.player.score -= 200;
        }
      }

      if (!this.isLetterAlreadyClicked(divinedLetter)) {
        const counter = this.countLetterInEntry(divinedLetter);
        if (counter > 0) {
          if (!isVowel) {
            this.player.score += counter * parseInt(this.prize);
            this.isDivineTour = false;
          }
          this.infoWheel =
            counter > 1
              ? `Litera ${divinedLetter} występuje ${counter} razy.`
              : `Litera ${divinedLetter} występuje ${counter} raz.`;
        } else {
          this.infoWheel = `Brak litery ${divinedLetter}.`;
          this.isDivineTour = false;
        }
      }
      if (this.isCompleted()) {
        this.infoWheel = `Gratulację! Twój wynik to ${this.player.score}`;
      }
    }
  }

  divinePasswordListener() {
    this.divinePasswordTour = true;
    this.infoKeyboard = `Uzupełnij hasło. Podaj kolejne litery.`;
    this.entry_copy = JSON.parse(JSON.stringify(this.entry));
  }

  saveGuess() {
    let guess = '';
    console.log(this.entry);
    this.entry.forEach(letter => {
      if (letter.visible === true) {
        guess += letter.value;
      }
      if (letter.value === ' ') {
        guess += ' ';
      }
    });
    console.log(guess);
    if (guess.toUpperCase() === this.password) {
      this.infoKeyboard = `Gratulację! Twój wynik to ${this.player.score}`;
      document.body
        .querySelector('.info_keyboard')
        .classList.add('info_keyboard--win');
      this.gameEnd = true;
    } else {
      this.infoWheel = `Niestety hasło nie jest prawidłowe. Próbuj dalej.`;
      this.resetGuess();
      this.isDivineTour = false;
    }
  }

  resetGuess() {
    this.entry = JSON.parse(JSON.stringify(this.entry_copy));
  }

  exitGame() {
    this.roomsService.exitRoom().subscribe(data => {});
  }

  newGame() {
    this.entry = [];
    this.alphabet = this.ALPHABET;
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
    this.player.score = 0;
    this.divinePasswordTour = false;
    this.isDivineTour = false;
    this.infoWheel = 'Zakręć kołem';
    this.infoKeyboard = 'Wybierz literę';
    this.gameEnd = false;
    document.body
      .querySelector('.info_keyboard')
      .classList.remove('info_keyboard--win');
  }

  onMessageSubmit() {
    this.messages.push(this.chatMessage);
    this.chatMessage = '';
  }
}
