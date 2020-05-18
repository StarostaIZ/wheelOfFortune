import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
  ) {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };
    // @ts-ignore
    const errorLabel: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;

    const validateResponse = this.validateService.validateLogin(user);

    if (validateResponse.isValid) {
      this.authService.logIn(user).subscribe(data => {
        // @ts-ignore
        const token = data.token;
        if (token) {
          this.authService.storeUserData(this.username, token);
          this.router.navigate(['/']);
        } else {
          errorLabel.style.display = 'block';
          errorLabel.textContent = 'Nieprawidłowe dane';
        }
      });
    }
    else{
      errorLabel.style.display = 'block';
      errorLabel.textContent = validateResponse.msg;
    }
  }

  ngOnInit(): void {}
}
