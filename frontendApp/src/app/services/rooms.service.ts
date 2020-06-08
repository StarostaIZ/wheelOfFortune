import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private API_URL: string = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) {}

  getAllRooms() {
    return this.http
      .get(`${this.API_URL}/roomList`, {
        headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
        },
      })
      .pipe();
  }

  createRoom(room) {
    return this.http
      .post(`${this.API_URL}/createRoom`, room, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
        },
      })
      .pipe();
  }

  enterRoom(room) {
    return this.http
      .post(`${this.API_URL}/enterRoom`, room, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
        },
      })
      .pipe();
  }

  getRoomData(roomId) {
    return this.http
      .get(`${this.API_URL}/room/${roomId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
        },
      })
      .pipe();
  }

  exitRoom() {
    this.router.navigate(['/']);
    return this.http
      .post(
        `${this.API_URL}/exitRoom`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
          },
        }
      )
      .pipe();
  }
}
