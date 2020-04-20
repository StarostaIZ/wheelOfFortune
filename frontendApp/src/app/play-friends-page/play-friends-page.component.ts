import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { log } from 'util';
import { ValidateService } from '../services/validate.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-play-friends-page',
  templateUrl: './play-friends-page.component.html',
  styleUrls: [
    '../../css/button.css',
    '../../css/logoSmall.css',
    './play-friends-page.component.css',
  ],
})
export class PlayFriendsPageComponent implements OnInit {
  currentRoomId = null;
  currentRoom = null;
  targetRoomPassword = '';
  isPasswordBoxVisible = false;
  errorLabel = null;
  roomsList = [
    // {
    //   id: 1,
    //   name: 'pokoj1',
    //   maxPeople: '3',
    //   password: null,
    //   peopleInRoom: '1',
    // },
    // {
    //   id: 2,
    //   name: 'pokoj2',
    //   maxPeople: '4',
    //   password: '12345',
    //   peopleInRoom: '2',
    // },
  ];
  constructor(
    private roomsService: RoomsService,
    private validateService: ValidateService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.roomsService.getAllRooms().subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.roomsList = data.rooms;
    });
    this.errorLabel = document.querySelector('.menu__error') as HTMLElement;
  }

  toogleRoom(roomId) {
    this.currentRoomId = roomId;
    const index = this.roomsList.findIndex(room => room.id === roomId);
    this.currentRoom = this.roomsList.find(room => room.id === roomId);
    const rooms = document.querySelectorAll('.menu__list__room');
    rooms.forEach(room => room.classList.remove('menu__list__room--clicked'));
    rooms[index].classList.add('menu__list__room--clicked');
  }

  enterRooom() {
    console.log('ok');
    this.roomsService
      .enterRooom({ roomId: this.currentRoomId })
      .subscribe(data => {
        console.log(data)
        // @ts-ignore
        if (data.error !== true) {
          this.errorLabel.style.display = 'block';
          // @ts-ignore
          this.errorLabel.textContent = data.data;
        } else{
          this.router.navigate(['gameWithFriends']);
          this.errorLabel.style.display = 'none';
        }
      });
  }

  checkPassword() {
    const validator = this.validateService.validateRoomPassword(
      this.currentRoom.password,
      this.currentRoom
    );
    if (validator.isValid) {
      this.enterRooom();
      this.errorLabel.style.display = 'none';
    } else {
      this.errorLabel.style.display = 'block';
      this.errorLabel.textContent = validator.msg;
    }
  }

  checkRoomPassword() {
    console.log(this.currentRoomId)
    console.log(this.currentRoom)
    if (this.currentRoomId !== null) {
      this.errorLabel.style.display = 'none';
      if (this.currentRoom.password !== null) {
        this.isPasswordBoxVisible = true;
      } else {
        this.enterRooom();
        this.isPasswordBoxVisible = false;
      }
    } else {
      this.isPasswordBoxVisible = false;
      this.errorLabel.style.display = 'block';
      this.errorLabel.textContent = 'Najpierw wybierz pokój';
    }
  }
}
