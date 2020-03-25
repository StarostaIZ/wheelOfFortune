import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css', '../../css/logoBig.css']
})
export class RegisterPageComponent implements OnInit {

  register = 'Zarejestruj';

  callBack(event) {
    console.log('callBack', event);
  }

  ngOnInit(): void {
  }
}
