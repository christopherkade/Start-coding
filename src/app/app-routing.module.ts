import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { NotAuthGuard } from './guard/not-auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { DocComponent } from './doc/doc.component';
import { DocAllComponent } from './doc-all/doc-all.component';

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
    component: QuizComponent,
    canActivate: [
      NotAuthGuard
    ]
  },
  {
    path: 'doc',
    component: DocComponent,
    canActivate: [
      NotAuthGuard
    ]
  },
  {
    path: 'doc-all',
    component: DocAllComponent,
    canActivate: [
      NotAuthGuard
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '', // Added to handle Firebase redirection on '/'
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
