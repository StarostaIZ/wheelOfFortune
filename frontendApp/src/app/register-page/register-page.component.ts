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
      passwordRepeat: this.passwordRepeat,
    };

    // @ts-ignore
    const errorLabel: HTMLElement = document.getElementsByClassName(
      'menu__error'
    ) as HTMLElement;

    this.authService.register(newUser).subscribe(data => {
      const result = data.toString();
      if (result === 'true') {
        this.router.navigate(['/']);
      } else {
        errorLabel.style.display = 'block';
        errorLabel.textContent = result;
      }
    });
  }

  ngOnInit(): void {}
}
