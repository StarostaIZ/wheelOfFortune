import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', '../../css/logoBig.css', '../../css/button.css']
})
export class MainPageComponent implements OnInit {

  isLogged = true;

  ngOnInit(): void {
  }
}
