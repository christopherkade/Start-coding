import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent {

  userProfile = false;
  burger = true;

  constructor(private router: Router,
    public userService: UserService) { }

  userProfileClick() {
    this.userProfile = !this.userProfile;
  }
}
