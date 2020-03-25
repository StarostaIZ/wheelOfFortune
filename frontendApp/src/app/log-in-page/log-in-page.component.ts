import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: [
    './log-in-page.component.css',
    '../../css/logoBig.css',
    '../../css/button.css',
  ],
})
export class LogInPageComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService
  ) {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };
    const errorLabel = document.querySelector('.menu__error');
    if (!this.validateService.validateLogin(user)) {
      errorLabel.style.display = 'block';
    } else {
      errorLabel.style.display = 'none';
    }
    this.authService.logIn(user).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
