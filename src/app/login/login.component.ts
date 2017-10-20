import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FirebaseApp} from 'angularfire2';
import {CookieService} from 'angular2-cookie/core';
import {UserService} from '../service/user.service';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private firebase: FirebaseApp,
              private cookieService: CookieService,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    // Initialize our login form
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('\\S+@\\S+\\.\\S+')])],
      'password': ['', Validators.required]
    });
  }

  /**
   * Checks if the email is in the correct format
   * @param email value to check
   * @returns {boolean} true if valid, false otherwise
   */
  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  /**
   * Sign in our user or fire a notification if there's an error
   */
  login() {
    this.firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
      this.notificationService.error('Oops !', 'Login failed', {
        position: ['bottom', 'right'],
        timeOut: 3000,
        showProgressBar: false,
        preventLastDuplicates: true,
        pauseOnHover: false,
        clickToClose: true,
        preventDuplicates: true
      });
    });
  }

}
