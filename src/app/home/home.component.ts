import { Component, OnInit } from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  welcomeTitle = 'Start your coding journey today';
  welcomeSubtitle = 'All you need to do is complete a short quizz !';

  constructor(firebase: FirebaseApp) { }

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
}
