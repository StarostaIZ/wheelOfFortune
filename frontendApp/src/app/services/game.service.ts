import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SseService} from "./sse-service.service";

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
    return this.http
      .get('http://localhost:8000/drawWord', { headers: this.header })
      .pipe();
  }

  startGame() {
    const roomID = localStorage.getItem('roomID');
    const body = { maxPoints: 1000 };
    return this.http
      .post(`http://localhost:8000/room/${roomID}/startGame`, body, {
        headers: this.header,
      })
      .pipe();
  }

  spin(angle) {
    const roomID = localStorage.getItem('roomID');
    const body = { angle: angle };
    return this.http
      .post(`http://localhost:8000/room/${roomID}/spin`, body, {
        headers: this.header,
      })
      .pipe();
  }

  divineLetter(letter) {
    const roomID = localStorage.getItem('roomID');
    const body = { letter: letter };
    return this.http
      .post(`http://localhost:8000/room/${roomID}/letter`, body, {
        headers: this.header,
      })
      .pipe();
  }

  points(playerId, points) {
    const roomID = localStorage.getItem('roomID');
    const body = { playerId: playerId, points: points };

    return this.http
      .post(`http://localhost:8000/room/${roomID}/points`, body, {
        headers: this.header,
      })
      .pipe();
  }

  divineWord(guessed) {
    const roomID = localStorage.getItem('roomID');
    const body = { guessed: guessed };
    return this.http
      .post(`http://localhost:8000/room/${roomID}/guess`, body, {
        headers: this.header,
      })
      .pipe();
  }

  newWord() {
    const roomID = localStorage.getItem('roomID');
    return this.http
      .get(`http://localhost:8000/room/${roomID}/newWord`, {
        headers: this.header,
      })
      .pipe();
  }
}
