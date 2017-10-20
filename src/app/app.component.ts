import {Component, OnInit} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(public cookieService: CookieService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.userService.handleAuthChange();
  }
}
