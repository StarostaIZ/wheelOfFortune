import { Component, Input, DoCheck } from '@angular/core';

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
  @Input() isLogged: boolean;
  isAdmin: boolean = false;

  ngDoCheck(): void {
    this.isLogged = localStorage.getItem('username') !== null;
    // this.isAdmin = localStorage.getItem('role') === 'admin';
  }
}
