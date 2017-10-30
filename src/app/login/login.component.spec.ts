import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { SimpleNotificationsModule } from 'angular2-notifications/dist';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'environments/environment';
import { UserService } from '../service/user.service';
import { CookieService } from 'angular2-cookie/core';

// TestBed creates an Angular testing module to be configured using
// configureTestingModule to produce the right environment to test our class

describe('LoginComponent', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async() => {
    // Declare the test module
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SimpleNotificationsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [LoginComponent],
      providers: [UserService, CookieService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    comp = fixture.componentInstance; // LoginComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('button'));
    el = de.nativeElement;
  });


  it('should be disabled', () => {
    fixture.detectChanges();
    expect(comp.loginForm.valid).toBeFalsy();
  });
});
