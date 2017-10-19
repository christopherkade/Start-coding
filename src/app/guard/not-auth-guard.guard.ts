import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  /**
   * Checks if our user is logged in, if not redirect him to login page
   * @returns {boolean}
   */
  canActivate(): boolean {
    if (this.cookieService.get('logged-in') === 'true') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
