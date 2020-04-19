import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateLogin(user) {
    if (user.username === undefined || user.password === undefined) {
      return { isValid: false, msg: 'Uzupełnij wszystkie pola' };
    }
    return { isValid: true, msg: '' };
  }

  validateRegister(user, passwordRepeat) {
    if (
      user.username === undefined ||
      user.email === undefined ||
      user.password === undefined
    ) {
      return { isValid: false, msg: 'Uzupełnij wszystkie pola' };
    }
    const emialValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emialValidator.test(String(user.email).toLowerCase())) {
      return { isValid: false, msg: 'Podaj poprawny adres email' };
    }
    if (user.password.length < 5) {
      return {
        isValid: false,
        msg: 'Hasło musi posiadać co najmniej 5 znaków',
      };
    }
    if (user.password !== passwordRepeat) {
      return { isValid: false, msg: 'Hasła muszą się zgadzać' };
    }
    return { isValid: true, msg: '' };
  }

  validateUserUpdate(user, passwordNewRepeat) {
    const emialValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emialValidator.test(String(user.email).toLowerCase())) {
      return { isValid: false, msg: 'Podaj poprawny adres email' };
    }
    if (
      (user.passwordOld === undefined && user.passwordNew !== undefined) ||
      (user.passwordOld !== undefined && user.passwordNew === undefined)
    ) {
      return {
        isValid: false,
        msg: 'Podaj stare i nowe hasło aby zmienić hasło',
      };
    }
    if (user.passwordNew !== undefined) {
      if (user.passwordNew.length < 5) {
        return {
          isValid: false,
          msg: 'Nowe hasło musi posiadać co najmniej 5 znaków',
        };
      }
      if (user.passwordNew !== passwordNewRepeat) {
        return { isValid: false, msg: 'Nowe hasła muszą się zgadzać' };
      }
    }
    return { isValid: true, msg: '' };
  }

  validateRoom(newRoom) {
    const { name, maxPeople } = newRoom;
    if (
      name === undefined ||
      name.trim().length === 0 ||
      maxPeople === ''
    )
      return { isValid: false, msg: 'Podaj nazwę i max liczbę osób' };
    else return { isValid: true, msg: '' };
  }

  validateFriendName(friendName){
    console.log(friendName)
    if (
      friendName === null ||
      friendName.trim() === ''
    ) {
      return {isValid: false, msg: 'Podaj nazwę użytkownika'};
    }
    else return { isValid: true, msg: '' };
  }
}
