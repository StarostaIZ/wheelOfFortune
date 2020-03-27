import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-game-page',
  templateUrl: './create-game-page.component.html',
  styleUrls: [
    './create-game-page.component.css',
    '../../css/logoSmall.css',
    '../../css/button.css',
  ],
})
export class CreateGamePageComponent implements OnInit {
  maxPlayers: number;
  roomName: string;
  password: string;
  constructor() {}

  ngOnInit(): void {}
}
