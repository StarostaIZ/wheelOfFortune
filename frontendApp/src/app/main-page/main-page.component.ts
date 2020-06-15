import { Component, Input, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [
    './main-page.component.css',
    '../../css/logoBig.css',
    '../../css/button.css',
  ],
})
export class MainPageComponent implements DoCheck {
  @Input() isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngDoCheck(): void {
    this.isLogged = this.authService.checkIsLogged();
    if (localStorage.getItem('roles')) {
      this.isAdmin = localStorage.getItem('roles').includes('ROLE_ADMIN');
    }
  }
}
