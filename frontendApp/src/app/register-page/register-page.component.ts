import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [
    './register-page.component.css',
    '../../css/logoBig.css',
    '../../css/button.css',
  ],
})
export class RegisterPageComponent implements OnInit {

  onRegisterSubmit() {
    console.log('register');
  }

  ngOnInit(): void {}
}
