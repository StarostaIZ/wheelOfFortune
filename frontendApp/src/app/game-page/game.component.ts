import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  divine = 'Odgadnij hasło';
  isDivineTour = false;
  category = 'SPORT';
  players = [ {name: 'Michał', score:1200}];

  callBack(event) {
    console.log('callBack', event);
  }

  constructor() {}

  ngOnInit(): void {}
}
