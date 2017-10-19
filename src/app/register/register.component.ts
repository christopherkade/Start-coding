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

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
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
   * Creates the user's account
   */
  register() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
  }
}
