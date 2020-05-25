import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  private API_URL: string = environment.API_URL;
  constructor(private http: HttpClient) {}

  getFriends() {
    return this.http.get(`${this.API_URL}/friendList`, { headers: this.header }).pipe();
  }

  deleteFriend(friend) {
    return this.http
      .post(`${this.API_URL}/removeFriend`, friend, {
        headers: this.header,
      })
      .pipe();
  }

  getFriendRequest() {
    return this.http
      .get(`${this.API_URL}/friendRequestList`, { headers: this.header })
      .pipe();
  }

  acceptFriendRequest(friend) {
    return this.http
      .post(`${this.API_URL}/acceptFriendRequest`, friend, {
        headers: this.header,
      })
      .pipe();
  }

  sendFriendRequest(friend) {
    return this.http
      .post(`${this.API_URL}/sendFriendRequest`, friend, {
        headers: this.header,
      })
      .pipe();
  }

  rejectFriendRequest(friend) {
    return this.http
      .post(`${this.API_URL}/rejectFriendRequest`, friend, {
        headers: this.header,
      })
      .pipe();
  }
}
