import { Component, OnInit } from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  welcomeTitle = 'Start your coding journey today';

  constructor(firebase: FirebaseApp, private router: Router) { }

  ngOnInit() {
    // const titleRef = firebase.database().ref().child('welcome-title');
    // titleRef.on('value', snap => {
    //   this.welcomeTitle = snap.val();
    // });
    //
    // const subtitleRef = firebase.database().ref().child('welcome-subtitle');
    // subtitleRef.on('value', snap => {
    //   this.welcomeSubtitle = snap.val();
    // });
  }

  startQuiz() {
    this.router.navigate(['/quiz']);
  }
}
