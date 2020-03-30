import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: [
    './my-profile-page.component.css',
    '../../css/button.css',
    '../../css/logoSmall.css',
  ],
})
export class MyProfilePageComponent implements OnInit {
  user = {
    username: 'Michał',
    email: 'michal@gmail.com',
    password: '12345',
  };
  disableUsername = true;
  disableEmail = true;
  disablePassword = true;

  constructor() {}

  ngOnInit(): void {
    if(localStorage.getItem('username') === null){
      alert('Brak dostępu');
    }
  }

  changeUsername() {
    this.disableUsername = !this.disableUsername;
  }

  changeEmail() {
    this.disableEmail = !this.disableEmail;
  }

  changePassword() {
    this.disablePassword = !this.disablePassword;
  }

  onUserSubmit() {
    alert('Zapisano');
  }
}
