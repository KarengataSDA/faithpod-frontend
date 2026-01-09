import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent implements OnInit {
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

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
          //this.router.navigate(['/dashboard']);
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
}
