import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  email: string;
  password: string;
  progress = 0;
  authError = false;

  constructor(private fb: FormBuilder,
              private router: Router) { }

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
   * Creates the user's account
   */
  register() {
    this.authError = false;

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
      this.progress = 100;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        this.authError = true;
        this.progress = 100;

        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    });
  }
}
