import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-central-admin-register',
    templateUrl: './central-admin-register.component.html',
    styleUrls: ['./central-admin-register.component.scss'],
    standalone: false
})
export class CentralAdminRegisterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  registerError: string = '';
  showPassword = false;
  showPasswordConfirmation = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  submit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.registerError = '';

    const apiUrl = `http://127.0.0.1:${environment.apiPort}/api/register`;

    this.http
      .post(apiUrl, this.form.getRawValue())
      .pipe(
        takeUntil(this.destroy$),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          // Store token if returned
          if (response.token) {
            sessionStorage.setItem('central_admin_token', response.token);
            sessionStorage.setItem('central_admin_user', JSON.stringify(response.user));
          }
          // Navigate to login or tenants page
          this.router.navigate(['/central-admin/login']);
        },
        error: (err) => {
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
        this.registerError =
          'Unable to connect to the server. Please check your network connection or try again later.';
      } else if (error.status === 422) {
        // Validation errors
        if (error.error.errors) {
          const errors = Object.values(error.error.errors).flat();
          this.registerError = errors.join(' ');
        } else {
          this.registerError = error.error.message || 'Validation error occurred.';
        }
      } else if (error.status === 409) {
        this.registerError = 'Email already exists. Please use a different email.';
      } else {
        errorMessage = `Server side error: ${error.status} - ${error.message}`;
        this.registerError = 'Registration failed. Please try again.';
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
