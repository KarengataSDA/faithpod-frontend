import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  message: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const hash = this.route.snapshot.paramMap.get('hash');

    if (userId && hash) {
      this.authService.verifyEmail(userId, hash).subscribe({
        next: (response: any) => {
          this.status = 'success';
          this.message = response.message;
          setTimeout(() => this.router.navigate(['/auth/login']), 3000);
        },
        error: () => {
          this.status = 'error';
        }
      });
    } else {
      this.status = 'error';
    }
  }
}
