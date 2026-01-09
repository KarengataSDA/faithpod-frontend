import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    standalone: false
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  loginError: string = '';
  showPassword = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.isLoading = true;

    this.authService
      .login(this.form.getRawValue())
      .pipe(
        takeUntil(this.destroy$),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
         this.isLoading = false
        },
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage =
          'Unable to connect to connect to the server. Please check your network connection or try again later.';
      } else if (error.status === 401) {
        this.loginError = 'Email or Password is incorrect. Please try again.';
      } else if (error.status === 403) {
        this.loginError = 'Your email address is not verified';
      } else {
        errorMessage = `Server side error: ${error.status} - ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
