import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).tokenValue}`,
  });
  private API_URL: string = environment.API_URL;
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get(`${this.API_URL}/admin/words`, { headers: this.header }).pipe();
  }

  getUsers() {
    return this.http.get(`${this.API_URL}/admin/users`, { headers: this.header }).pipe();
  }

  getRooms() {
    return this.http.get(`${this.API_URL}/roomList`, { headers: this.header }).pipe();
  }

  getCategories() {
    return this.http.get(`${this.API_URL}/admin/categories`, { headers: this.header }).pipe();
  }

  addWord(word, categoryId) {
    return this.http
      .post(`${this.API_URL}/admin/addWord `, { word, categoryId }, { headers: this.header })
      .pipe();
  }

  addCategory (category) {
    return this.http
      .post(`${this.API_URL}/admin/addCategory`, { name: category }, { headers: this.header })
      .pipe();
  }

  removeUser(id) {
    return this.http
      .delete(`${this.API_URL}/admin/removeUser/${id}`,  { headers: this.header })
      .pipe();
  }
  removeRoom(id) {
    return this.http
      .delete(`${this.API_URL}/admin/removeRoom/${id}`, { headers: this.header })
      .pipe();
  }
  removeWord(id) {
    return this.http
      .delete(`${this.API_URL}/admin/removeWord/${id}`, { headers: this.header })
      .pipe();
  }
  removeCategory(id) {
    return this.http
      .delete(`${this.API_URL}/admin/removeCategory/${id}`, { headers: this.header })
      .pipe();
  }
}
