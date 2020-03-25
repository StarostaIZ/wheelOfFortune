import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateLogin(user) {
    return !(user.username === undefined || user.password === undefined);
  }
}
