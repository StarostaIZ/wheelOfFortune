import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { GameService } from '../services/game.service';
import { RoomsService } from '../services/rooms.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-game-friends-page',
  templateUrl: './game-friends-page.component.html',
  styleUrls: [
    './game-friends-page.component.css',
    '../../css/button.css',
    '../../css/logoSmall.css',
  ],
})
export class GameFriendsPageComponent implements OnInit, AfterViewChecked {
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
  players = [
    { name: 'xxxxxxxxxxxxxx', score: 0 },
    { name: 'xxxxxxxxxxxxxx', score: 0 },
    { name: 'xxxxxxxxxxxxxx', score: 0 },
    { name: 'xxxxxxxxxxxxxx', score: 0 },
  ];
  player = { name: 'xxxxxxxxxxxxxx', score: 0 };
  prize = '0';
  divinePasswordTour = false;
  infoWheel = 'Zakręć kołem';
  infoKeyboard = 'Wybierz literę';
  password = '';
  gameEnd = false;
  roomID;
  wheel = null;
  chatBox = null;
  entryWords = [];
  waitingForStart = true;
  isGameAdmin = null;
  wheelAngle = 0;
  userId = null;
  userName = null;

  constructor(
    private gameService: GameService,
    private roomsService: RoomsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.roomID = localStorage.getItem('roomID');
    this.userName = localStorage.getItem('username');
    let adminId;

    this.roomsService.getRoomData(this.roomID).subscribe(data => {
      console.log(data)
      // @ts-ignore
      adminId = data.data.adminId;
      this.userService.getUser().subscribe(data => {
        // @ts-ignore
        this.userId = data.data.id;
        this.isGameAdmin = adminId === this.userId;
      });
    });

    this.gameService
      .getServerSendEvent(
        `http://localhost:3000/.well-known/mercure?topic=roomInfo/${this.roomID}`
      )
      .subscribe(data => {
        console.log(data)
        // @ts-ignore
        const incomingData = JSON.parse(data.data);
        if (this.isGameAdmin === false && this.waitingForStart === true) {
          if (incomingData.word !== undefined) {
            this.waitingForStart = false;
            const { category, word } = incomingData.word;
            this.incomingWord(category, word);
          }
        }
      });

    this.gameService
      .getServerSendEvent(
        `http://localhost:3000/.well-known/mercure?topic=gameInfo/${this.roomID}`
      )
      .subscribe(data => {
        // @ts-ignore
        const incomingData = JSON.parse(data.data);
        console.log(incomingData);
        // @ts-ignore
        if (incomingData.angle !== undefined) {
          // @ts-ignore
          this.incomingRotate(incomingData.angle);
        }
        // @ts-ignore
        else if (incomingData.letter !== undefined) {
          // @ts-ignore
          this.incomingLetter(incomingData.letter);
        } else if (incomingData.guessed !== undefined) {
          // @ts-ignore
          this.incomingGuess(incomingData.guessed);
        } else if (incomingData.points !== undefined) {
          // @ts-ignore
          this.incomingPlayerListWithPoints(incomingData.letter);
        } else if (incomingData.word !== undefined) {
          // @ts-ignore
          this.incomingNewWord(incomingData.letter);
        }
      });
  }

  incomingPlayerListWithPoints(){

  }

  incomingGuess(isGuessed) {
    console.log(isGuessed)
    if (isGuessed) {
      this.infoWheel = `Hasło odgadnięte!`;
      document.body
        .querySelector('.info_wheel')
        .classList.add('info_keyboard--win');
    }
    this.entry.forEach(letter => (letter.visible = true));
  }

  ngAfterViewChecked(): void {
    this.wheel = document.querySelector('#wheel');
    this.chatBox = document.querySelector('.chatBox');
  }

  startGame($event) {
    this.waitingForStart = false
    const maxPoints = $event;
    console.log(maxPoints)
    this.gameService.startGame(maxPoints).subscribe(data => {
      // @ts-ignore
      const { word, category } = data.data;
      this.incomingWord(category, word);
    });
  }

  incomingWord(category, word) {
    this.password = word;
    for (const letter of this.password) {
      this.entry.push({ value: letter, visible: false });
    }
    this.dividePasswordIntoWords();
  }

  dividePasswordIntoWords() {
    const wordsArray = this.password.split(' ');
    let index = 0;
    for (let i = 0; i < wordsArray.length; i++) {
      this.entryWords.push([]);
      for (let j = 0; j < wordsArray[i].length + 1; j++) {
        this.entryWords[i].push(this.entry[index]);
        index++;
      }
    }
    this.entryWords[this.entryWords.length - 1].splice(-1, 1);
  }

  incomingRotate(deg) {
    this.wheelAngle = deg;
    this.wheel.style.transition = 'transform 5s cubic-bezier(0.22, 0.99, 0.23, 0.99)';
    this.wheel.addEventListener('transitionend', () => {
      this.wheel.style.pointerEvents = 'auto';
      this.wheel.style.transition = 'none';
      let actualDeg = deg % 360;
      this.wheelAngle = actualDeg;
      actualDeg = actualDeg + 15;
      this.prize = this.PRIZES[Math.floor(actualDeg / 30)];
      if (this.prize === 'BANKRUT') {
        this.infoWheel = 'BANKRUT';
      } else {
        this.infoWheel = 'Kwota: ' + this.prize;
      }
    });
  }

  rotateWheel() {
    this.infoKeyboard = 'Wybierz literę';
    this.wheel.style.pointerEvents = 'none';
    this.wheel.style.transition = 'transform 5s cubic-bezier(0.22, 0.99, 0.23, 0.99)';
    const deg = 720 + Math.floor(Math.random() * 270);
    this.gameService.spin(deg).subscribe();
    this.wheelAngle = deg;
    this.wheel.addEventListener('transitionend', () => {
      this.wheel.style.pointerEvents = 'auto';
      this.wheel.style.transition = 'none';
      let actualDeg = deg % 360;
      this.wheelAngle = deg;
      actualDeg = actualDeg + 15;
      this.prize = this.PRIZES[Math.floor(actualDeg / 30)];
      if (this.prize === 'BANKRUT') {
        this.infoWheel = 'BANKRUT. Zakręć jeszcze raz';
      } else {
        this.isDivineTour = true;
      }
    });
  }

  incomingLetter(letter) {
    const counter = this.countLetterInEntry(letter);
    this.isLetterAlreadyClicked(letter);
    if (counter > 0) {
      this.infoWheel =
        counter > 1
          ? `Litera ${letter} występuje ${counter} razy.`
          : `Litera ${letter} występuje ${counter} raz.`;
    } else {
      this.infoWheel = `Brak litery ${letter}.`;
    }
    console.log(this.alphabet);
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
          console.log('samogłoska');
          this.infoKeyboard = `Samogłoska kosztuje 200. Nie masz wystarczającej liczby punktów.`;
          return;
        } else {
          this.player.score -= 200;
        }
      }

      if (!this.isLetterAlreadyClicked(divinedLetter)) {
        console.log('here');
        this.gameService.divineLetter(divinedLetter).subscribe();
        const counter = this.countLetterInEntry(divinedLetter);
        if (counter > 0) {
          console.log('is vov: ' + isVowel)
          if (!isVowel) {
            // Dodanie punktów

            // const player = this.players.find(player => player.name ===  this.userName)
            // player.score += counter * parseInt(this.prize);
            // this.gameService.points(this.userId)
            console.log('here2');
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
    }
    if (this.isCompleted()) {
      this.infoWheel = `Gratulację! Twój wynik to ${this.player.score}`;
    }
  }

  divinePasswordListener() {
    this.divinePasswordTour = true;
    this.infoKeyboard = `Uzupełnij hasło. Podaj kolejne litery.`;
    this.infoWheel = ``;
    this.entry_copy = JSON.parse(JSON.stringify(this.entry));
  }

  saveGuess() {
    let guess = '';
    this.entry.forEach(letter => {
      if (letter.visible === true) {
        guess += letter.value;
      }
      if (letter.value === ' ') {
        guess += ' ';
      }
    });
    this.gameService.divineWord(guess).subscribe();
    if (guess === this.password) {
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
    this.entryWords = [];
    this.dividePasswordIntoWords();
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

  openChatBox() {
    this.chatBox.style.transform = `translateX(${this.chatBox.offsetWidth}px)`;
  }

  closeChatBox() {
    this.chatBox.style.transform = `translateX(-${this.chatBox.offsetWidth}px)`;
  }

  onMessageSubmit() {
    this.messages.push(this.chatMessage);
    this.chatMessage = '';
  }
}
