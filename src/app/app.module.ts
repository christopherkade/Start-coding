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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    NotAuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
