import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';

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

  constructor(private validateService: ValidateService, private authService: AuthService) {}

  onRegisterSubmit() {
    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
      passwordRepeat: this.passwordRepeat,
    };
    const errorLabel = document.querySelector('.menu__error');
    if (!this.validateService.validateRegister(newUser)) {
      errorLabel.style.display = 'block';
    } else {
      errorLabel.style.display = 'none';
    }
    this.authService.register(newUser).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
