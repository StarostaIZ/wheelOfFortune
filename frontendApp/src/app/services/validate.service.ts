import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateLogin(user) {
    return !(user.username === undefined || user.password === undefined);
  }

  validateRegister(user) {
    return !(user.username === undefined || user.email === undefined || user.password === undefined || user.passwordRepeat === undefined);
  }
}
