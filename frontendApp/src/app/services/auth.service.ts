import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = null;
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private API_URL: string = environment.API_URL;
  constructor(private http: HttpClient, private router: Router) {}

  register(user) {
    return this.http
      .post(`${this.API_URL}/register`, user, { headers: this.header })
      .pipe();
  }

  logIn(user) {
    return this.http
      .post(`${this.API_URL}/login`, user, { headers: this.header })
      .pipe();
  }

  storeUserData(username) {
    localStorage.setItem('username', username);
    this.username = username;
  }

  logOut() {
    this.http.post(`${this.API_URL}/logout`, {});
    localStorage.clear();
    this.router.navigate(['login']);
    this.username = null;
  }
}
