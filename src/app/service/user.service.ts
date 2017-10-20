import { Injectable } from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class UserService {

  user: User;

  constructor(private firebase: FirebaseApp,
              private router: Router,
              private cookieService: CookieService) { }

  /**
   * Catches auth state changes
   * When a user logs in, save his profile in our user attribute to be accessed in the future
   */
  handleAuthChange() {
    this.firebase.auth().onAuthStateChanged(user => {
      // User logged-in
      if (user) {
        // Get his information
        this.user = new User();
        this.user.uid = user.uid;
        this.user.email = user.email;
        if (user.displayName != null)
          this.user.displayName = user.displayName;
        if (user.photoURL != null)
          this.user.photoURL = user.photoURL;

        // If on the login or register screen, redirect to /home
        if (this.router.url === '/login' || this.router.url === '/register') {
          this.router.navigate(['/home']);
        }

        // Set our cookie to logged-in
        this.cookieService.put('logged-in', 'true');
      } else {

        // User has logged-out, remove data
        this.user = null;

        // Set our cookie to logged-out
        this.cookieService.put('logged-in', 'false');
      }
    });
  }
}
