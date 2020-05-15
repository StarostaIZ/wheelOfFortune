import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}


  getUsers(){
    return this.http
      .get('/getUsers', { headers: this.header })
      .pipe();
  }

  removeUser(userId){
    return this.http
      .get('/getUser', { headers: this.header })
      .pipe();
  }

  getRooms(){
    return this.http
      .get('/getRooms', { headers: this.header })
      .pipe();
  }

  removeRoom(roomId){
    return this.http
      .get('/getRooms', { headers: this.header })
      .pipe();
  }

  getWords() {
    return this.http
      .get('/getWords', { headers: this.header })
      .pipe();
  }

  addWord(newWord){
    return this.http
      .get('/getWords', { headers: this.header })
      .pipe();
  }
  removeWord(wordId){
    return this.http
      .get('/getWords', { headers: this.header })
      .pipe();
  }
}
