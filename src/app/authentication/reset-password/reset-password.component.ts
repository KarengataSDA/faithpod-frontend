import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TenantService } from 'src/app/shared/services/tenant.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;
  isCentralAdmin: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tenantService: TenantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    // Check if we're on root domain (central admin) or subdomain (tenant)
    const tenant = this.tenantService.getTenantFromSubdomain();
    this.isCentralAdmin = tenant === null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword() {
    // Validation
    if (!this.email) {
      this.error = 'Email is required';
      return;
    }

    if (!this.password) {
      this.error = 'Password is required';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    if (this.password !== this.password_confirmation) {
      this.error = 'Passwords do not match';
      return;
    }

    if (!this.token) {
      this.error = 'Invalid or missing reset token';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    const data = {
      token: this.token,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    if (this.isCentralAdmin) {
      // Central Admin password reset
      this.authService.resetCentralAdminPassword(data).subscribe({
        next: (response) => {
          this.message = response.message || 'Password reset successfully!';
          this.error = '';
          this.isLoading = false;
          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          this.error = error.error?.message || error.error?.errors?.email?.[0] || 'Failed to reset password. Please try again.';
          this.message = '';
          this.isLoading = false;
        }
      });
    } else {
      // Tenant password reset
      this.authService.resetPassword(data).subscribe({
        next: (response) => {
          this.message = response.message || 'Password reset successfully!';
          this.error = '';
          this.isLoading = false;
          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          this.error = error.error?.message || error.error?.errors?.email?.[0] || 'Failed to reset password. Please try again.';
          this.message = '';
          this.isLoading = false;
        }
      });
    }
  }
}
