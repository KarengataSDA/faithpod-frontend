import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent {
  email: string;
  message: string; 
  error: string;

  constructor(private authService: AuthService) {}

  sendResetLink() {
    this.authService.sendResetLink(this.email).subscribe( 
      response => {
        this.message = 'Reset Link sent successfully'
        this.error = '';
      },
      error => {
        this.error = 'Failed to send reset link',
        this.message = '';
      }
    )
  }
}
