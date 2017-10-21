import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  /**
   * Checks if our user is logged in, if not redirect him to login page
   * @returns {boolean}
   */
  canActivate(): boolean {
    if (this.userService.isAuth === 'true') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
