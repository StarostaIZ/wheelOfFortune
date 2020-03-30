import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('./getUser', { headers: header }).pipe();
  }
}
