import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-spinner-game',
  templateUrl: './loading-spinner-game.component.html',
  styleUrls: [
    './loading-spinner-game.component.css',
    '../../../css/button.css',
  ],
})
export class LoadingSpinnerGameComponent implements OnInit {
  @Input() isGameAdmin: boolean;
  @Input() playersListQueue: any;
  @Output() messageEvent = new EventEmitter<number>();
  maxPoints = 10000;

  constructor() {}

  ngOnInit(): void {}

  startGame() {
    if (this.maxPoints < 2000 || this.maxPoints > 1000000) {
      const error = document.querySelector('.menu__error') as HTMLElement;;
      error.style.display = 'block'
      error.textContent = 'Podaj wartość z zakresu 2000 - 1000000';
    } else this.messageEvent.emit(this.maxPoints);
  }
}
