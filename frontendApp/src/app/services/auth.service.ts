import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(user) {
    const header = new HttpHeaders({'Content-Type':  'application/json', 'Access-Control-Allow-Origin': '*'});
    return this.http
      .post('http://localhost:8000/login', user, { headers: header })
      .pipe(map(res => res.json()));
  }
}
