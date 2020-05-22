import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
} from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = null;
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  register(user) {
    return this.http.post('/register', user, { headers: this.header }).pipe();
  }

  logIn(user) {
    return this.http.post('/login', user, { headers: this.header }).pipe();
  }

  signInWithFB() {
    console.log('logowanie');
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(user => {
        console.log(user);
        if (user !== null) {
          this.storeUserData(user.name, 'FB_USER');
          this.router.navigate(['/']);
        }
      });
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
    if (localStorage.getItem('roles') === 'FB_USER') {
      this.signOutWithFB()
    } else {
      this.http.post('/logout', {});
    }
    localStorage.clear();
    this.router.navigate(['login']);
    this.username = null;
  }
}
