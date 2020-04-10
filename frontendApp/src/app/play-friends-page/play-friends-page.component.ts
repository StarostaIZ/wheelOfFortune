import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { log } from 'util';

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
  friendsRoomsList = [
    { roomName: 'PokójZnajomego1' },
    { roomName: 'PokójZnajomego2' },
  ];
  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getAllRooms().subscribe(data => {
      // @ts-ignore
      this.roomsList = data.rooms;
    });
  }

  tooglRoom(event) {
    const rooms = document.querySelectorAll('.menu__list__room');
    rooms.forEach(room => room.classList.remove('menu__list__room--clicked'));
    event.target.classList.add('menu__list__room--clicked');
  }
}
