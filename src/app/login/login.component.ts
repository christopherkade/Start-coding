import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FirebaseApp} from 'angularfire2';
import {CookieService} from 'angular2-cookie/core';
import {UserService} from '../service/user.service';

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
  authError = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private firebase: FirebaseApp,
              private cookieService: CookieService,
              private userService: UserService) { }

  ngOnInit(): void {
    // Initialize our login form
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('\\S+@\\S+\\.\\S+')])],
      'password': ['', Validators.required]
    });

    this.handleAuthChange();
  }

  /**
   * Catches when a user logs in/out.
   * Log-in: redirects to our /home & sets our cookie
   * Log-out: removes out cookie
   */
  handleAuthChange() {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.progress = 100;
        this.authError = false;

        setTimeout(() => {
          this.router.navigate(['/home']);
          this.cookieService.put('logged-in', 'true');
        }, 1000);
      } else {
        this.authError = false;
        this.cookieService.put('logged-in', 'false');
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
    this.firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
      this.authError = true;
      this.progress = 100;

      setTimeout(() =>{
        this.progress = 0;
      }, 1000);

      // TODO: Add error message
    });
  }

}
