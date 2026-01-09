import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  baseUrl = environment.apiUrl
  message: string = 'verifying...'; 

  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')
    const hash = this.route.snapshot.paramMap.get('hash')

    if(userId && hash) {
      this.authService.verifyEmail(userId, hash).subscribe({
       next: (response:any) => {
          this.message = response.message;

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email successfully verified',
            timer: 2000,
            showConfirmButton: false 
          });

          setTimeout(() => {this.router.navigate(['/auth/login'])}, 2000)
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Verification Failed',
            text: 'The verification link maybe invalid or expired'
          });

          this.router.navigate(['/auth/login'])
        }
     })
    } 
  }
}
