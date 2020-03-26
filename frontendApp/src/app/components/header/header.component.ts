import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() isLogged: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogOutClick() {
    this.authService.logOut();
  }
}
