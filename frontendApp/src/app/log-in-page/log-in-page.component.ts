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
    const errorLabel: HTMLElement = document.getElementsByClassName(
      'menu__error'
    ) as HTMLElement;

    this.authService.logIn(user).subscribe(data => {
      const result = data.toString();
      if (result === 'true') {
        this.authService.storeUserData(this.username);
        this.router.navigate(['/']);
      } else {
        errorLabel.style.display = 'block';
        errorLabel.textContent = result;
      }
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
