import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', '../../css/logoBig.css', '../../css/button.css']
})
export class MainPageComponent implements OnInit {
  isLogged: boolean;

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('username') !== null;
  }
}
