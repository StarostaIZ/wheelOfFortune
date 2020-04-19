import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get('./friendList').pipe();
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
    return this.http.post('./removeFriend', friend, { headers: header }).pipe();
  }

  getFriendRequest(){
    return this.http.get('./friendRequestList').pipe();
  }

  acceptFriendRequest(friend){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./acceptFriendRequest', friend, { headers: header }).pipe();
  }

  sendFriendRequest(friend){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./sendFriendRequest', friend, { headers: header }).pipe();
  }

  rejectFriendRequest(friend){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('./rejectFriendRequest', friend, { headers: header }).pipe();
  }
}
