import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get('/admin/words', { headers: this.header }).pipe();
  }

  getUsers() {
    return this.http.get('/admin/users', { headers: this.header }).pipe();
  }

  getRooms() {
    return this.http.get('/roomList', { headers: this.header }).pipe();
  }

  getCategories() {
    return this.http.get('/admin/categories', { headers: this.header }).pipe();
  }

  addWord(word, categoryId) {
    return this.http
      .post('/admin/addWord ', { word, categoryId }, { headers: this.header })
      .pipe();
  }

  addCategory (category) {
    return this.http
      .post('/admin/addCategory  ', { name: category }, { headers: this.header })
      .pipe();
  }

  removeUser(id) {
    return this.http
      .post('/admin/removeUser', { id }, { headers: this.header })
      .pipe();
  }
  removeRoom(id) {
    return this.http
      .post('/admin/removeRoom', { id }, { headers: this.header })
      .pipe();
  }
  removeWord(id) {
    return this.http
      .post('/admin/removeWord', { id }, { headers: this.header })
      .pipe();
  }
  removeCategory(id) {
    return this.http
      .post('/admin/removeCategory', { id }, { headers: this.header })
      .pipe();
  }
}
