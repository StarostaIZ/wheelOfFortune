import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SseService } from './sse-service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private API_URL: string = environment.API_URL;

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

  closeServerSendEvents() {
    this.sseService.closeEventSources();
  }

  drawOfflineWord() {
    return this.http
      .get(`${this.API_URL}/drawWord`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe();
  }

  drawWord() {
    return this.http
      .get(`${this.API_URL}/drawWord`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).tokenValue
          }`,
        },
      })
      .pipe();
  }

  startGame(maxPoints) {
    const roomID = localStorage.getItem('roomID');
    return this.http
      .post(
        `${this.API_URL}/room/${roomID}/startGame`,
        { maxPoints: maxPoints },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).tokenValue
            }`,
          },
        }
      )
      .pipe();
  }

  spin(angle) {
    const roomID = localStorage.getItem('roomID');
    const body = { angle: angle };
    return this.http
      .post(`${this.API_URL}/room/${roomID}/spin`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).tokenValue
          }`,
        },
      })
      .pipe();
  }

  divineLetter(letter) {
    const roomID = localStorage.getItem('roomID');
    const body = { letter: letter };
    return this.http
      .post(`${this.API_URL}/room/${roomID}/letter`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).tokenValue
          }`,
        },
      })
      .pipe();
  }

  points(playerId, points) {
    const roomID = localStorage.getItem('roomID');
    const body = { playerId: playerId, points: points };
    return this.http
      .post(`${this.API_URL}/room/${roomID}/points`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).tokenValue
          }`,
        },
      })
      .pipe();
  }

  divineWord(guessed, playerId) {
    const roomID = localStorage.getItem('roomID');
    if (guessed) {
      const body = { guessed: guessed, playerId: playerId };
      return this.http
        .post(`${this.API_URL}/room/${roomID}/guess`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).tokenValue
            }`,
          },
        })
        .pipe();
    } else {
      const body = { guessed: guessed };
      return this.http
        .post(`${this.API_URL}/room/${roomID}/guess`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).tokenValue
            }`,
          },
        })
        .pipe();
    }
  }

  nextPlayer() {
    const roomID = localStorage.getItem('roomID');
    return this.http
      .post(
        `${this.API_URL}/room/${roomID}/nextPlayer`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).tokenValue
            }`,
          },
        }
      )
      .pipe();
  }

  getGame() {
    const roomID = localStorage.getItem('roomID');
    return this.http.get(`${this.API_URL}/room/${roomID}/getGame`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).tokenValue
        }`,
      },
    });
  }
}
