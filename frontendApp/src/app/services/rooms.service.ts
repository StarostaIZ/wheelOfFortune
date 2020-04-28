import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  getAllRooms() {
    return this.http.get('http://localhost:8000/roomList', { headers: this.header }).pipe();
  }

  createRoom(room){
    return  this.http.post('http://localhost:8000/createRoom', room, { headers: this.header }).pipe();
  }

  enterRooom(room){
    return this.http.post('http://localhost:8000/enterRoom', room, { headers: this.header }).pipe();
  }

  getRoomData(roomId){
    return this.http.get(`http://localhost:8000/room/${roomId}`, { headers: this.header }).pipe();
  }

  exitRoom(){
    return this.http.post('http://localhost:8000/exitRoom', {},{ headers: this.header }).pipe();
  }
}
