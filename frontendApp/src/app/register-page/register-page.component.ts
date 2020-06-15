import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;

  constructor(
    private validateService: ValidateService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  onRegisterSubmit() {
    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    const errorLabel: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;

    const validateResponse = this.validateService.validateRegister(
      newUser,
      this.passwordRepeat
    );

    if (validateResponse.isValid) {
      this.authService.register(newUser).subscribe(data => {
        // @ts-ignore
        const token = data.token;
        if (token) {
          this.authService.auth(token);
        } else {
          errorLabel.style.display = 'block';
          // @ts-ignore
          errorLabel.textContent = data.error;
        }
      });
    } else {
      errorLabel.style.display = 'block';
      errorLabel.textContent = validateResponse.msg;
    }
  }

  ngOnInit(): void {}
}
