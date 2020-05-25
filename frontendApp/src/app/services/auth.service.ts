import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  headerWithNoToken = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  username = null;
  private API_URL: string = environment.API_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private userService: UserService
  ) {}

  register(user) {
    return this.http
      .post(`${this.API_URL}/register`, user, {
        headers: this.headerWithNoToken,
      })
      .pipe();
  }

  logIn(user) {
    return this.http
      .post(`${this.API_URL}/login`, user, { headers: this.headerWithNoToken })
      .pipe();
  }

  signInWithFB() {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(user => {
        if (user !== null) {
          this.logInFacebook(user).subscribe();
          this.storeUserData(user.name, 'ROLE_USER_FACEBOOK');
          this.router.navigate(['/']);
        }
      });
  }

  logInFacebook(user) {
    return this.http
      .post(
        `${this.API_URL}/loginFacebook `,
        { id: user.id, username: user.name, emial: user.email },
        { headers: this.headerWithNoToken }
      )
      .pipe();
  }

  signOutWithFB(): void {
    this.socialAuthService.signOut();
  }

  storeUserData(username, roles) {
    localStorage.setItem('username', username);
    localStorage.setItem('roles', roles);
    this.username = username;
  }

  logOut() {
    if (localStorage.getItem('roles') === 'ROLE_USER_FACEBOOK') {
      this.signOutWithFB();
    }
    this.http.post(`${this.API_URL}/logout`, {}, { headers: this.header}).subscribe();
    localStorage.clear();
    this.router.navigate(['login']);
    this.username = null;
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
      this.storeUserData(this.username, roles);
      this.router.navigate(['/']);
    });
  }
}
