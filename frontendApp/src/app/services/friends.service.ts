import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get('./friendsList').pipe();
  }

  addFriend(friend) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./addFriend', friend).pipe();
  }

  deleteFriend(friend){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./deleteFriend', friend, { headers: header }).pipe();
  }
}
