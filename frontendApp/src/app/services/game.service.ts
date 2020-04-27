import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {SseService} from "./sse-service.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient, private sseService: SseService, private zone: NgZone) { }

  getServerSendEvent(url: string){
    return new Observable(observer => {
      const eventSource = this.sseService.getEventSource(url);
      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event)
        })
      };
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error)
        })
      };
    })
  }

  drawWord(){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('./drawWord', { headers: header }).pipe();
  }

  startGame(){
    const roomID = localStorage.getItem('roomID');
    const body = {maxPoints: 1000};
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`./room/${roomID}/startGame`, body,{ headers: header }).pipe();
  }

  spin(angle){
    const roomID = localStorage.getItem('roomID');
    const body = {angle: angle};
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`./room/${roomID}/spin`, body,{ headers: header }).pipe();
  }

  divineLetter(letter){
    const roomID = localStorage.getItem('roomID');
    const body = {letter: letter};
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`./room/${roomID}/letter`, body,{ headers: header }).pipe();
  }

  points(playerId, points){
    const roomID = localStorage.getItem('roomID');
    const body = {playerId: playerId, points:points};
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`./room/${roomID}/points`, body,{ headers: header }).pipe();
  }

  divineWord(guessed){
    const roomID = localStorage.getItem('roomID');
    const body = {guessed: guessed};
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`./room/${roomID}/guess`, body,{ headers: header }).pipe();
  }

  newWord(){
    const roomID = localStorage.getItem('roomID');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`./room/${roomID}/newWord`,{ headers: header }).pipe();
  }
}
