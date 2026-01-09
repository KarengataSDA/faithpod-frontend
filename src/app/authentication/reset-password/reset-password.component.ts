import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})
export class ResetPasswordComponent {
  token: string;
  email: string 
  password: string 
  password_confirmation: string 
  message: string 
  error: string 

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

  }

  resetPassword() {
    const data = {
      token: this.token,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }

    this.authService.resetPassword(data).subscribe( 
      response => {
        this.message = 'Password reset successfully',
        this.error = '',
        this.router.navigate(['auth/login'])
      },
      error => {
        this.error = "Failed to reset password",
        this.message = ''
      }
    )
  }
}
