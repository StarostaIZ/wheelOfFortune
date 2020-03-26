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
  constructor() {}

  ngOnInit(): void {}

  changeUsername() {}
  changeEmail() {}
  changePassword() {}
}
