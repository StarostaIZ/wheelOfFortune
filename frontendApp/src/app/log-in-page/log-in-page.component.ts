import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css', '../../css/logoBig.css'],
})
export class LogInPageComponent implements OnInit {
  logIn = 'Zaloguj się';

  callBack(event) {
    console.log('callBack', event);
  }

  ngOnInit(): void {}
}
