import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SseService } from './sse-service.service';
import {loadConfigurationFromPath} from "tslint/lib/configuration";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private sseService: SseService,
    private zone: NgZone
  ) {}

  getServerSendEvent(url: string) {
    return new Observable(observer => {
      const eventSource = this.sseService.getEventSource(url);
      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  drawWord() {
    return this.http.get('/drawWord', { headers: this.header }).pipe();
  }

  startGame(maxPoints) {
    const roomID = localStorage.getItem('roomID');
    return this.http
      .post(
        `/room/${roomID}/startGame`,
        { maxPoints: maxPoints },
        {
          headers: this.header,
        }
      )
      .pipe();
  }

  spin(angle) {
    const roomID = localStorage.getItem('roomID');
    const body = { angle: angle };
    return this.http
      .post(`/room/${roomID}/spin`, body, {
        headers: this.header,
      })
      .pipe();
  }

  divineLetter(letter) {
    const roomID = localStorage.getItem('roomID');
    const body = { letter: letter };
    return this.http
      .post(`/room/${roomID}/letter`, body, {
        headers: this.header,
      })
      .pipe();
  }

  points(playerId, points) {
    const roomID = localStorage.getItem('roomID');
    const body = { playerId: playerId, points: points };
    console.log(points)
    return this.http
      .post(`/room/${roomID}/points`, body, {
        headers: this.header,
      })
      .pipe();
  }

  divineWord(guessed) {
    const roomID = localStorage.getItem('roomID');
    const body = { guessed: guessed };
    return this.http
      .post(`/room/${roomID}/guess`, body, {
        headers: this.header,
      })
      .pipe();
  }

  nextPlayer() {
    const roomID = localStorage.getItem('roomID');
    return this.http
      .post(`/room/${roomID}/nextPlayer`, {}, {
        headers: this.header,
      })
      .pipe();
  }

  newWord() {
    const roomID = localStorage.getItem('roomID');
    return this.http
      .post(`/room/${roomID}/newWord`, {
        headers: this.header,
      })
      .pipe();
  }
}
