import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-central-admin-login',
    templateUrl: './central-admin-login.component.html',
    styleUrls: ['./central-admin-login.component.scss'],
    standalone: false
})
export class CentralAdminLoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  loginError: string = '';
  showPassword = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const apiUrl = `http://127.0.0.1:${environment.apiPort}/api/login`;

    this.http
      .post(apiUrl, this.form.getRawValue())
      .pipe(
        takeUntil(this.destroy$),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          // Store token and user info
          sessionStorage.setItem('central_admin_token', response.token);
          sessionStorage.setItem('central_admin_user', JSON.stringify(response.user));
          // Navigate to tenants page
          this.router.navigate(['/central-admin/tenants']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        this.loginError =
          'Unable to connect to the server. Please check your network connection or try again later.';
      } else if (error.status === 401) {
        this.loginError = 'Email or Password is incorrect. Please try again.';
      } else if (error.status === 403) {
        this.loginError = 'Your account has been disabled or you do not have permission.';
      } else {
        errorMessage = `Server side error: ${error.status} - ${error.message}`;
        this.loginError = 'Login failed. Please try again.';
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
