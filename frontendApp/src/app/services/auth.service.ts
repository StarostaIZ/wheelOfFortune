import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = null;
  constructor(private http: HttpClient, private router:Router) {}

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
    this.http.post('./logout', {});
    localStorage.clear();
    this.router.navigate(['login']);
    this.username = null;
  }
}
