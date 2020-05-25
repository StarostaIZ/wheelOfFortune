import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private API_URL: string = environment.API_URL;
  constructor(private http: HttpClient) {}

  getUser(token = undefined) {
    if (token !== undefined) {
      return this.http
        .get(`${this.API_URL}/getUser`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .pipe();
    } else {
      return this.http
        .get(`${this.API_URL}/getUser`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .pipe();
    }
  }

  updateUser(user) {
    return this.http
      .put(`${this.API_URL}/updateUser`, user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe();
  }

  getStats() {
    return this.http
      .get(`${this.API_URL}/getStats`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe();
  }
}
