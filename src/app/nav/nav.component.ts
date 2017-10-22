import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseApp} from 'angularfire2';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent {

  userProfile = false;
  burger = true;

  constructor(private router: Router,
              private firebase: FirebaseApp,
              public userService: UserService) {}

  /**
   * Catches the log-out button click
   * Signs-out of firebase & navigates back to /login
   */
  logout() {
    this.userProfile = false;
    this.firebase.auth().signOut();
  }

  userProfileClick() {
    this.userProfile = !this.userProfile;
  }
}
