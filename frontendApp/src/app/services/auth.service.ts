import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  username = null;
  private API_URL: string = environment.API_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  register(user) {
    return this.http
      .post(`${this.API_URL}/register`, user, {
        headers: this.header,
      })
      .pipe();
  }

  logIn(user) {
    return this.http
      .post(`${this.API_URL}/login`, user, { headers: this.header })
      .pipe();
  }

  storeUserData(username, roles) {
    localStorage.setItem('username', username);
    localStorage.setItem('roles', roles);
    this.username = username;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.username = null;
    return this.http.post(
      `${this.API_URL}/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  auth(token) {
    this.storeToken(token, () => {
      this.getUser(token);
    });
  }

  storeToken(token, callback) {
    localStorage.setItem('token', token);
    callback();
  }

  getUser(token) {
    this.userService.getUser(token).subscribe(data => {
      // @ts-ignore
      const roles = data.data.roles;
      // @ts-ignore
      const username = data.data.username;
      this.storeUserData(username, roles);
      this.router.navigate(['/']);
    });
  }
}
