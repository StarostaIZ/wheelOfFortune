import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

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
  username: '';
  email: '';
  password: '';
  newPassword: '';
  passwordRepeat: '';

  disableEmail = true;
  disablePassword = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      // @ts-ignore
      this.username = data.data.username;
      // @ts-ignore
      this.email = data.data.email;
    });
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
