import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './service/auth.service';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {NotAuthGuard} from './guard/not-auth-guard.guard';
import {AngularFireModule} from 'angularfire2';
import {environment} from 'environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {NavComponent} from './nav/nav.component';
import { QuizComponent } from './quiz/quiz.component';
import {CookieService} from 'angular2-cookie/core';
import { RegisterComponent } from './register/register.component';
import {UserService} from './service/user.service';
import {SimpleNotificationsModule} from 'angular2-notifications/dist';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    QuizComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    NotAuthGuard,
    AuthService,
    CookieService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
