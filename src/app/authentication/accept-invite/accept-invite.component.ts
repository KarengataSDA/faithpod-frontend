import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from 'src/app/shared/services/member.service';
import { TenantService } from 'src/app/shared/services/tenant.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss'],
  standalone: false,
})
export class AcceptInviteComponent implements OnInit, OnDestroy {
  token = '';
  password = '';
  passwordConfirm = '';
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  tenantName = '';

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private tenantService: TenantService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';

    if (!this.token) {
      this.errorMessage = 'Invalid or missing invite link. Please contact your church administrator.';
    }

    const storedName = this.tenantService.getTenantName();
    if (storedName) {
      this.tenantName = storedName;
    } else {
      this.tenantService.fetchTenantInfo()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: info => {
            this.tenantName = info.name;
            this.tenantService.setTenantName(info.name);
            if (info.theme) this.themeService.applyTheme(info.theme);
          },
          error: () => {}
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirmPassword(): void { this.showConfirmPassword = !this.showConfirmPassword; }

  submit(): void {
    this.errorMessage = '';

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.memberService.acceptInvite(this.token, this.password, this.passwordConfirm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Account activated!',
            text: 'Your account has been set up. Please log in.',
            confirmButtonText: 'Go to Login',
          }).then(() => this.router.navigate(['/auth/login']));
        },
        error: err => {
          this.isLoading = false;
          if (err.status === 404 || err.status === 422) {
            this.errorMessage = err.error?.message ?? 'Invite link is invalid or has expired.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
        }
      });
  }
}
