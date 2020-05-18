import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  private API_URL: string = environment.API_URL;
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http
      .get(`${this.API_URL}/getUser`, { headers: this.header })
      .pipe();
  }

  updateUser(user) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .put(`${this.API_URL}/updateUser`, user, { headers: this.header })
      .pipe();
  }
}
