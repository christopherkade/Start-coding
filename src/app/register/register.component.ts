import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  email: string;
  password: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('\\S+@\\S+\\.\\S+')])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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
   * Creates the user's account or fires a notification if there is an error
   */
  register() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        this.notificationService.error('Oops !', 'An account with this email address already exists', {
          position: ['bottom', 'right'],
          timeOut: 3000,
          showProgressBar: false,
          preventLastDuplicates: true,
          pauseOnHover: false,
          clickToClose: true,
          preventDuplicates: true
        });
      }
    });
  }
}
