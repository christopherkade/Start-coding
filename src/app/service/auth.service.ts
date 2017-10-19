import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  // True if our user is logged in, false otherwise
  isLoggedIn = false;

  constructor() { }
}
