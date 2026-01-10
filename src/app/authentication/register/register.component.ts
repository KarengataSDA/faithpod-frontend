import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TenantService } from 'src/app/shared/services/tenant.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  passwordConfirm: string = '';
  errorMessage: string = ''
  showPassword = false;
  showConfirmPassword = false
  isLoading: boolean = false;
  isTermsChecked: boolean = false;
  isCentralAdmin: boolean = false;
  tenantName: string = '';

  constructor(
    private authService: AuthService,
    private tenantService: TenantService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if we're on root domain (central admin) or subdomain (tenant)
    const tenant = this.tenantService.getTenantFromSubdomain();
    this.isCentralAdmin = tenant === null;

    // Fetch tenant name if it's a tenant registration
    if (!this.isCentralAdmin) {
      this.loadTenantInfo();
    }
  }

  private loadTenantInfo(): void {
    // Check if tenant name is already in session storage
    const storedTenantName = this.tenantService.getTenantName();
    if (storedTenantName) {
      this.tenantName = storedTenantName;
      return;
    }

    // Fetch tenant info from API
    this.tenantService.fetchTenantInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tenantInfo) => {
          this.tenantName = tenantInfo.name;
          this.tenantService.setTenantName(tenantInfo.name);
        },
        error: (err) => {
          console.error('Failed to fetch tenant info:', err);
          // Fallback to subdomain if API fails
          const subdomain = this.tenantService.getTenantFromSubdomain();
          if (subdomain) {
            // Capitalize first letter and format subdomain
            this.tenantName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
          }
        }
      });
  }

  clearErrorMessage() {
    this.errorMessage = '';

  }


  validateRegistrationForm(email: string, password: string, passwordConfirm: string, phoneNumber: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.errorMessage = "Please enter a valid email address"
      return false
    }

    if (password.length < 6) {
      this.errorMessage = "Password should be at least 6 characters"
      return false
    }

    if (password !== passwordConfirm) {
      this.errorMessage = "Password and Confirm Password do not match"
      return false
    }

    const normalizedPhone = this.formatPhoneNumber(phoneNumber)

    const phoneNumberRegx = /^254\d{9}$/;
    if (!phoneNumberRegx.test(normalizedPhone)) {
      this.errorMessage = 'Phone number must be 12 digits and start with 254 (e.g., 254716402525)';
      return false;
    }

    this.errorMessage = ''
    return true
  }

  formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '') 

    if(digits.startsWith('0')) {
      return '254' + digits.slice(1);
    } else if (digits.startsWith('254')) {
      return digits
    }
    return digits;
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  submit(): void {
    if (this.isCentralAdmin) {
      this.centralAdminRegister();
    } else {
      this.tenantRegister();
    }
  }

  private tenantRegister(): void {
    const formatPhoneNumber = this.formatPhoneNumber(this.phoneNumber)

    if (this.validateRegistrationForm(this.email, this.password, this.passwordConfirm, this.phoneNumber)) {
      this.isLoading = true;
      this.authService.register({
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
        phone_number: formatPhoneNumber,
        password: this.password,
        password_confirm: this.passwordConfirm,
      })
        .subscribe(() => {
          Toast.fire({
            icon: 'success',
            title: 'Registered Successfully'
          })
          this.isLoading = false
          this.router.navigate(['/auth/verification-notice'], { queryParams: { email: this.email } })
        },
          (error) => {
            if (error.status === 409) {
              this.errorMessage = 'Email already exists. Please use a different email'
            }
            else if (error.status === 422) {
              this.errorMessage = 'Please enter a valid email address'
            }
            else {

            }
          }
        );

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    }
  }

  private centralAdminRegister(): void {
    // For central admin, we only need name, email, and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.errorMessage = "Please enter a valid email address"
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = "Password should be at least 8 characters"
      return;
    }

    if (this.password !== this.passwordConfirm) {
      this.errorMessage = "Password and Confirm Password do not match"
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const apiUrl = `http://127.0.0.1:${environment.apiPort}/api/register`;
    const fullName = `${this.firstName} ${this.middleName} ${this.lastName}`.trim();

    this.http.post(apiUrl, {
      name: fullName || this.firstName,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirm
    }).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Registered Successfully'
        });

        // Store token if returned
        if (response.token) {
          sessionStorage.setItem('central_admin_token', response.token);
          sessionStorage.setItem('central_admin_user', JSON.stringify(response.user));
        }

        // Navigate to login
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 409) {
          this.errorMessage = 'Email already exists. Please use a different email'
        }
        else if (error.status === 422) {
          if (error.error.errors) {
            const errors = Object.values(error.error.errors).flat();
            this.errorMessage = (errors as string[]).join(' ');
          } else {
            this.errorMessage = 'Please enter valid information';
          }
        }
        else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
