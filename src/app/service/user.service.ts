import { Injectable } from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import {User} from '../model/user';

@Injectable()
export class UserService {

  user: User;

  constructor(private firebase: FirebaseApp) { }

  /**
   * Catches auth state changes
   * When a user logs in, save his profile in our user attribute to be accessed in the future
   */
  handleAuthChange() {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = new User();
        this.user.email = user.email;
        this.user.displayName = user.displayName;
        this.user.uid = user.uid;
        this.user.photoURL = user.photoURL;

        if (this.user.displayName === null) {
          this.user.displayName = 'None';
        }
        if (this.user.photoURL === null) {
          this.user.photoURL = 'None';
        }
      } else {
        this.user = null;
      }
    });
  }
}
