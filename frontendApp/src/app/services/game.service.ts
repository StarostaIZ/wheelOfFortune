import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  drawWord(){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('./drawWord', { headers: header }).pipe();
  }
}
