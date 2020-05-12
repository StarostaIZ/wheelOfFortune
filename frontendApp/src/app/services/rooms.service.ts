import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private API_URL: string = environment.API_URL

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getAllRooms() {
    return this.http
      .get(`${this.API_URL}/roomList`, { headers: this.header })
      .pipe();
  }

  createRoom(room) {
    return this.http
      .post(`${this.API_URL}/createRoom`, room, { headers: this.header })
      .pipe();
  }

  enterRooom(room) {
    return this.http
      .post(`${this.API_URL}/enterRoom`, room, { headers: this.header })
      .pipe();
  }

  getRoomData(roomId) {
    return this.http.get(`/room/${roomId}`, { headers: this.header }).pipe();
  }

  exitRoom() {
    this.router.navigate(['/']);
    return this.http
      .post(`${this.API_URL}/exitRoom`, {}, { headers: this.header })
      .pipe();
  }
}
