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
  players = [];
  prize = '0';
  divinePasswordTour = false;
  infoWheel = 'Zakręć kołem';
  infoKeyboard = 'Wybierz literę';
  password = '';
  gameEnd = false;
  roundEnd = false;
  roomID;
  wheel = null;
  entryWords = [];
  waitingForStart = true;
  isGameAdmin = null;
  wheelAngle = 0;
  userId = null;
  userName = null;
  playersListQueue = [{ username: '' }];
  maxGamePoints = 0;
  turnPlayerName = '';
  playersOrder = [];

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
      // @ts-ignore
      this.playersListQueue = data.data.usersInRoom.users;
      // @ts-ignore
      adminId = data.data.adminId;
      this.userService.getUser().subscribe(data => {
        // @ts-ignore
        this.userId = data.data.id;
        this.isGameAdmin = adminId === this.userId;
      });
    });
    this.initWebSocketRoom();
    this.initWebSocketGame();
  }

  ngAfterViewChecked(): void {
    this.wheel = document.querySelector('#wheel');
  }

  initWebSocketRoom() {
    this.gameService
      .getServerSendEvent(
        `http://localhost:3000/.well-known/mercure?topic=roomInfo/${this.roomID}`
      )
      .subscribe(data => {
        // @ts-ignore
        const incomingData = JSON.parse(data.data);
        if (this.isGameAdmin === false && this.waitingForStart === true) {
          if (incomingData.word !== undefined) {
            this.waitingForStart = false;
            const { category, word } = incomingData.word;
            this.incomingWord(category, word);
          }
        }
        if (incomingData.users !== undefined) {
          this.playersListQueue = incomingData.users;
        }
        if (incomingData.players !== undefined) {
          this.players = incomingData.players;
        }
        if (incomingData.maxPoints !== undefined) {
          this.maxGamePoints = incomingData.maxPoints;
        }
        if (incomingData.turn !== undefined) {
          this.incomingTurn(incomingData.turn);
        }
      });
  }

  initWebSocketGame() {
    this.gameService
      .getServerSendEvent(
        `http://localhost:3000/.well-known/mercure?topic=gameInfo/${this.roomID}`
      )
      .subscribe(data => {
        // @ts-ignore
        const incomingData = JSON.parse(data.data);
        // @ts-ignore
        if (incomingData.angle !== undefined) {
          // @ts-ignore
          this.incomingRotate(incomingData.angle);
        }
        // @ts-ignore
        if (incomingData.letter !== undefined) {
          // @ts-ignore
          this.incomingLetter(incomingData.letter);
        }
        if (incomingData.guessed !== undefined) {
          // @ts-ignore
          this.incomingGuess(incomingData.guessed);
        }
        if (incomingData.points !== undefined) {
          // @ts-ignore
          this.incomingPlayersListWithPoints(incomingData.points);
        }
        if (incomingData.word !== undefined) {
          // @ts-ignore
          this.incomingNewWord(incomingData.word);
        }
        if (incomingData.turn !== undefined) {
          // @ts-ignore
          this.incomingTurn(incomingData.turn);
        }
      });
  }

  incomingNewWord(newWord) {
    const {word, category} = newWord;
    this.incomingWord(category, word)
  }

  incomingTurn(turn) {
    this.turnPlayerName = turn.name;
  }

  incomingPlayersListWithPoints(playersList) {
    this.players = playersList;
  }

  incomingGuess(isGuessed) {
    if (isGuessed) {
      this.infoWheel = `Hasło odgadnięte!`;
      const infoWheelLabel = document.body.querySelector('.info_wheel');
      if (infoWheelLabel !== null)
        infoWheelLabel.classList.add('info_keyboard--win');
      this.entry.forEach(letter => (letter.visible = true));
      this.roundEnd = true;
      this.checkGameEnd();
    }
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
  }

  incomingWord(category, word) {
    console.log(word);
    this.category = category;
    this.password = word;
    for (const letter of this.password) {
      this.entry.push({ value: letter, visible: false });
    }
    this.dividePasswordIntoWords();
  }

  incomingRotate(deg) {
    this.wheelAngle = deg;
    this.wheel.style.transition =
      'transform 5s cubic-bezier(0.22, 0.99, 0.23, 0.99)';
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

  startGame($event) {
    this.waitingForStart = false;
    this.gameService.startGame($event).subscribe(data => {
      // @ts-ignore
      this.players = data.data.players;
      // @ts-ignore
      this.maxGamePoints = data.data.maxPoints;
      // @ts-ignore
      const { word, category } = data.data.word;
      this.incomingWord(category, word);
    });
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

  rotateWheel() {
    if (this.turnPlayerName === this.userName) {
      this.infoKeyboard = 'Wybierz literę';
      this.wheel.style.pointerEvents = 'none';
      this.wheel.style.transition =
        'transform 5s cubic-bezier(0.22, 0.99, 0.23, 0.99)';
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
          const player = this.players.find(
            player => player.name === this.userName
          );
          player.points = 0;
          this.gameService.points(player.id, player.points).subscribe();
          this.gameService.nextPlayer().subscribe();
        } else {
          this.isDivineTour = true;
        }
      });
    }
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
    const player = this.players.find(player => player.name === this.userName);
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
        if (player.points < 200) {
          this.infoKeyboard = `Samogłoska kosztuje 200. Nie masz wystarczającej liczby punktów.`;
          return;
        } else {
          player.points -= 200;
          this.gameService.points(player.id, player.points).subscribe();
        }
      }

      if (!this.isLetterAlreadyClicked(divinedLetter)) {
        this.gameService.divineLetter(divinedLetter).subscribe();
        const counter = this.countLetterInEntry(divinedLetter);

        if (counter > 0) {
          if (!isVowel) {
            // Dodanie punktów
            player.points += counter * parseInt(this.prize);
            this.gameService.points(player.id, player.points).subscribe();
            this.isDivineTour = false;
          }
          this.infoWheel =
            counter > 1
              ? `Litera ${divinedLetter} występuje ${counter} razy.`
              : `Litera ${divinedLetter} występuje ${counter} raz.`;
        } else {
          this.infoWheel = `Brak litery ${divinedLetter}.`;
          player.points = 0;
          this.gameService.points(this.userId, player.points).subscribe();
          this.gameService.nextPlayer().subscribe();
          this.isDivineTour = false;
        }
      }
    }
    if (this.isCompleted()) {
      this.infoWheel = `Gratulację! Twój wynik to ${player.points}`;
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
    const result = guess === this.password;
    this.gameService.divineWord(result).subscribe();
    if (result) {
      const player = this.players.find(player => player.name === this.userName);
      this.infoKeyboard = `Gratulację! Twój wynik to ${player.points}`;
      // player.pointsTotal += player.points;
      // set points total
      // this.gameService.points(this.userId, player.points).subscribe();
      document.body
        .querySelector('.info_keyboard')
        .classList.add('info_keyboard--win');
      this.roundEnd = true;
      this.checkGameEnd();
    } else {
      this.infoWheel = `Niestety hasło nie jest prawidłowe. Próbuj dalej.`;
      this.resetGuess();
      this.isDivineTour = false;
    }
  }

  checkGameEnd() {
    //pointsTotal
    if (this.players.some(player => player.points >= this.maxGamePoints)) {
      this.gameEnd = true;
      this.playersOrder = JSON.parse(JSON.stringify(this.players))
      console.log(this.playersOrder)
      this.playersOrder.sort((a, b) =>
        a.points > b.points ? 1 : b.points > a.points ? -1 : 0
      );
      console.log(this.playersOrder)
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

  newRound() {
    this.entry = [];
    this.alphabet = this.ALPHABET;
    this.divinePasswordTour = false;
    this.isDivineTour = false;
    this.infoWheel = 'Zakręć kołem';
    this.infoKeyboard = 'Wybierz literę';
    this.gameEnd = false;
    this.roundEnd = false;
    // reset points
    this.gameService.newWord().subscribe();
    this.gameService.nextPlayer().subscribe();
    document.body
      .querySelector('.info_keyboard')
      .classList.remove('info_keyboard--win');
  }
}
