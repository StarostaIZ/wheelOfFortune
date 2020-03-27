import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-friends-page',
  templateUrl: './play-friends-page.component.html',
  styleUrls: [
    './play-friends-page.component.css',
    '../../css/button.css',
    '../../css/logoSmall.css',
  ],
})
export class PlayFriendsPageComponent implements OnInit {
  roomsList = [{ roomName: 'Pokój1' }, { roomName: 'Pokój2' }];
  constructor() {}

  ngOnInit(): void {}

  tooglRoom(event) {
    const rooms = document.querySelectorAll('.menu__list__room');
    rooms.forEach(room => room.classList.remove('menu__list__room--clicked'));
    event.target.classList.add('menu__list__room--clicked');
  }
}
