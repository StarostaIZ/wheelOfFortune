import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = null;
  constructor(private http: HttpClient) {}

  register(user) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./register', user, { headers: header }).pipe();
  }

  logIn(user) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./login', user, { headers: header }).pipe();
  }

  storeUserData(username) {
    localStorage.setItem('username', username);
    this.username = username;
  }

  logOut() {
    localStorage.clear();
    this.username = null;
  }
}
