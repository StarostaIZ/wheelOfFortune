import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });
  constructor(private http: HttpClient, private router: Router) {}

  sendMessage(message, roomID) {
    const body = { message: message };
    return this.http
      .post(`/room/${roomID}/sendMessage`, body, {
        headers: this.header,
      })
      .pipe();
  }
}
