import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verification-notice',
  imports: [],
  templateUrl: './verification-notice.component.html',
  styleUrl: './verification-notice.component.scss'
})
export class VerificationNoticeComponent implements OnInit {
  email: String | null = null 
  message: string = ''; 

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    })
  }

  resendVerificationEmail(): void {
    this.authService.resendVerificationEmail().subscribe({
      next: () => {
        this.message = 'A new verifa'
      },
      error: () => {
        this.message = 'Failed to resn try again'
      }
    })
  }
}
