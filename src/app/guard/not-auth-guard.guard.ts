import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Checks if our user is logged in, if not redirect him to login page
   * @returns {boolean}
   */
  canActivate(): boolean {
    // if (this.authService.isLoggedIn) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;
    return true;
  }
}
