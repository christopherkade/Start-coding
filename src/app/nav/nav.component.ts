import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseApp} from 'angularfire2';
import {UserService} from '../service/user.service';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent {

  infoPannel = false;
  burger = true;
  editProfile = false;

  constructor(private router: Router,
              private firebase: FirebaseApp,
              public userService: UserService,
              private notificationService: NotificationsService) {}

  /**
   * Catches key events, if 'i' is pressed, open / close
   * user panel
   * @param {KeyboardEvent} e
   */
  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    if (e.key === 'i' && !this.editProfile) {
      this.userPanelClick();
    }
  }

  /**
   * Catches the log-out button click
   * Signs-out of firebase & navigates back to /login
   */
  logout() {
    this.infoPannel = false;
    this.firebase.auth().signOut();
    this.router.navigate(['/login']);
  }

  userPanelClick() {
    this.editProfile = false;
    this.infoPannel = !this.infoPannel;
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
}
