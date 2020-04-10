import { Component, OnInit } from '@angular/core';
import { RoomsService} from "../services/rooms.service";
import {ValidateService} from "../services/validate.service";

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
  roomName: string;
  maxPlayers = [1,2,3,4];
  selectedNumber = '';
  password: string;
  constructor(private roomsService: RoomsService, private validateService: ValidateService) {}

  ngOnInit(): void {}

  createRoomSubmit(){

    const newRoom = {
      roomName : this.roomName,
      maxPlayers : this.selectedNumber,
      password : this.password,
    };
    const errorLabel: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    const validateResponse = this.validateService.validateRoom(newRoom);
    if(validateResponse.isValid){
      this.roomsService.createRoom(newRoom);
      errorLabel.style.display = 'none';
    }
    else{
      errorLabel.textContent = validateResponse.msg;
      errorLabel.style.display = 'block';
    }
    console.log(newRoom)
  }

}
