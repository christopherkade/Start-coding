import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'app/service/auth.service';
import {FirebaseApp} from "angularfire2";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  infoPannel = false;
  burger = true;

  constructor(private authService: AuthService,
              private router: Router,
              private firebase: FirebaseApp) { }

  ngOnInit() {
  }

  // /**
  //  * Catches key events, if 'i' is pressed, open / close
  //  * user panel
  //  * @param {KeyboardEvent} e
  //  */
  // @HostListener('document:keydown', ['$event'])
  // keypress(e: KeyboardEvent) {
  //   if (e.key === 'i') {
  //     this.infoPannel = !this.infoPannel;
  //   }
  // }

  logout() {
    this.authService.isLoggedIn = false;
    this.firebase.auth().signOut();
    this.router.navigate(['/login']);
  }

  infoPannelClick() {
    this.infoPannel = !this.infoPannel;
  }

  openBurger() {
    this.burger = !this.burger;
  }
}
