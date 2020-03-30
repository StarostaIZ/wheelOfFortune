import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
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

    const validateResponse = this.validateService.validateRegister(newUser, this.passwordRepeat);

    if (validateResponse.isValid) {
      this.authService.register(newUser).subscribe(data => {
        // @ts-ignore
        if (data.data === true) {
          this.authService.storeUserData(this.username);
          this.router.navigate(['/']);
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
