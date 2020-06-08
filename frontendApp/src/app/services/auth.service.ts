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
  TTL: number = 7200000;
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
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
        }
      }
    );
  }

  auth(token) {
    this.storeToken(token, () => {
      this.getUser(token);
    });
  }

  checkIsLogged(){
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      return false;
    }
    const token = JSON.parse(tokenString)
    const nowTime = new Date()
    if (nowTime.getTime() > token.expiryTime) {
      localStorage.removeItem('token')
      return false
    }
    return true;
  }

  storeToken(token, callback) {
    const tokenObj = {tokenValue: token, expiryTime: new Date().getTime() + this.TTL}
    localStorage.setItem('token', JSON.stringify(tokenObj));
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
