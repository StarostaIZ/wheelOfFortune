import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-friends-page',
  templateUrl: './game-friends-page.component.html',
  styleUrls: [
    './game-friends-page.component.css',
    '../../css/button.css',
    '../../css/logoSmall.css',
  ],
})
export class GameFriendsPageComponent implements OnInit {
  chatMessage: string;
  messages = [];

  entry = ['B', 'A', 'S', 'E', 'B', 'A', 'L', 'L'];
  alphabet = [
    'A',
    'Ą',
    'B',
    'C',
    'Ć',
    'D',
    'E',
    'Ę',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'Ł',
    'M',
    'N',
    'Ń',
    'O',
    'Ó',
    'P',
    'Q',
    'R',
    'S',
    'Ś',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'Ź',
    'Ż',
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
  players = [
    { name: 'Michał', score: 1200 },
    { name: 'Maciek', score: 1300 },
  ];
  prize = '2500';

  callBack(event) {
    this.isDivineTour = !this.isDivineTour;
  }

  rotateWheel(event) {
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
    });
  }

  constructor() {}

  ngOnInit(): void {}

  onMessageSubmit() {
    this.messages.push(this.chatMessage);
    this.chatMessage = '';
  }
}
