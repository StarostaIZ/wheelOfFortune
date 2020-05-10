import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http
      .get('/getUser', { headers: this.header })
      .pipe();
  }

  updateUser(user) {
    return this.http
      .put('/updateUser', user, { headers: this.header })
      .pipe();
  }

  getStats(){
    return this.http
      .get('/getStats',  { headers: this.header })
      .pipe();
  }
}
