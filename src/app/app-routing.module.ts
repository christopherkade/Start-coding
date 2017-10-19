import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {NotAuthGuard} from './guard/not-auth-guard.guard';
import {HomeComponent} from './home/home.component';
import {QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [
      NotAuthGuard
    ]
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}