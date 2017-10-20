import { Component, OnInit } from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private firebase: FirebaseApp, private router: Router) { }

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
