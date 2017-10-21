import {Component, OnInit} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private cookieService: CookieService,
              public userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAuth = this.cookieService.get('logged-in')
    this.userService.handleAuthChange();
  }
}
