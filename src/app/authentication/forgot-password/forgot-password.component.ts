import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TenantService } from 'src/app/shared/services/tenant.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;
  isCentralAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    // Check if we're on root domain (central admin) or subdomain (tenant)
    const tenant = this.tenantService.getTenantFromSubdomain();
    this.isCentralAdmin = tenant === null;
  }

  sendResetLink() {
    if (!this.email) {
      this.error = 'Please enter your email address';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    if (this.isCentralAdmin) {
      // Central Admin password reset
      this.authService.sendCentralAdminResetLink(this.email).subscribe({
        next: (response) => {
          this.message = response.message || 'If that email address is in our system, we have sent a password reset link to it.';
          this.error = '';
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to send reset link. Please try again.';
          this.message = '';
          this.isLoading = false;
        }
      });
    } else {
      // Tenant password reset
      this.authService.sendResetLink(this.email).subscribe({
        next: (response) => {
          this.message = response.message || 'If that email address is in our system, we have sent a password reset link to it.';
          this.error = '';
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to send reset link. Please try again.';
          this.message = '';
          this.isLoading = false;
        }
      });
    }
  }
}
