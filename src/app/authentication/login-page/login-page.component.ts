import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthService } from '../../shared/services/auth.service';
import { TenantService } from '../../shared/services/tenant.service';
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
  isCentralAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tenantService: TenantService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Check if we're on root domain (central admin) or subdomain (tenant)
    const tenant = this.tenantService.getTenantFromSubdomain();
    this.isCentralAdmin = tenant === null;

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
    this.loginError = '';

    if (this.isCentralAdmin) {
      // Central admin login
      this.centralAdminLogin();
    } else {
      // Tenant member login
      this.tenantLogin();
    }
  }

  private tenantLogin(): void {
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

  private centralAdminLogin(): void {
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
          this.router.navigate(['/tenants']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.loginError = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        this.loginError =
          'Unable to connect to the server. Please check your network connection or try again later.';
      } else if (error.status === 401) {
        this.loginError = 'Email or Password is incorrect. Please try again.';
      } else if (error.status === 403) {
        this.loginError = 'Your email address is not verified';
      } else if (error.status === 422) {
        // Validation errors
        if (error.error.errors) {
          const errors = Object.values(error.error.errors).flat();
          this.loginError = (errors as string[]).join(' ');
        } else if (error.error.message) {
          this.loginError = error.error.message;
        } else {
          this.loginError = 'Please check your input and try again.';
        }
      } else {
        this.loginError = 'An error occurred. Please try again.';
      }
    }
    console.error('Login error:', error);
    return throwError(() => error);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
