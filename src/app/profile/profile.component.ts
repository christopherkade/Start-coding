import { Component, HostListener } from '@angular/core';
import { UserService } from '../service/user.service';
import { FirebaseApp } from 'angularfire2';
import { NotificationsService } from 'angular2-notifications/dist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {

  editProfile = false;

  constructor(public userService: UserService,
    private firebase: FirebaseApp,
    private notificationService: NotificationsService,
    private router: Router) { }

  /**
   * Saves user profile when 'enter' is pressed
   * @param {KeyboardEvent} e
   */
  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    if (e.key === 'Enter' && this.editProfile) {
      this.editUserProfile();
    }
  }

  /**
   * Called when the user edits his/her profile
   * Updates it via firebase with the new displayName value
   */
  editUserProfile() {
    this.editProfile = false;
    this.firebase.auth().currentUser.updateProfile({
      displayName: this.userService.user.displayName,
      photoURL: ''
    }).then(() => {
      this.notificationService.success('Hurray !', 'Profile updated', {
        position: ['bottom', 'right'],
        timeOut: 3000,
        showProgressBar: false,
        preventLastDuplicates: true,
        pauseOnHover: false,
        clickToClose: true,
        preventDuplicates: true
      });
    }).catch(error => {
      console.log('Error on user profile update: ' + error);
    });
  }

  createAccount() {
    this.firebase.auth().signOut();
  }
}
