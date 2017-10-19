import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  email: string;
  password: string;
  progress = 0;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              firebase: FirebaseApp) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('\\S+@\\S+\\.\\S+')])],
      'password': ['', Validators.required]
    });

    this.handleAuthChange();
  }

  handleAuthChange() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authService.isLoggedIn = true;
        this.progress = 100;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      } else {
        console.log('Not logged in');
      }
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
   * Sets our progress to 100 to give an impression of loading
   * then go on to the main page
   */
  login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
      console.log('Auth error');
      this.progress = 0;

      // TODO: Add error message
      // TODO: Allow account creation
    });
  }

}
