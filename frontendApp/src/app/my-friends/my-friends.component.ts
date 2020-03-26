import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: [
    './my-friends.component.css',
    '../../css/button.css',
    '../../css/logoSmall.css',
  ],
})
export class MyFriendsComponent implements OnInit {
  friends = [{ username: 'Jacek' }, { username: 'Maciek' }];
  constructor() {}

  ngOnInit(): void {}

  removeFriend() {}
}
