import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteShopData } from '../../ngrx/e-commerce/shop.action';
import { LayoutService } from '../../services/layout.service';
import { Menu, NavService } from '../../services/nav.service';
import { SwitcherService } from '../../services/switcher.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/components/classes/auth';
import { HttpClient } from '@angular/common/http';
import { TenantService } from '../../services/tenant.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public isCollapsed = true;
  user: User;
  bannerUrl: string | null = null;

  constructor(
    private authService: AuthService,
    public navServices: NavService,
    private router: Router,
    private http: HttpClient,
    private tenantService: TenantService,
  ){ }

  ngOnInit(): void {
    Auth.userEmitter
      .pipe(takeUntil(this.destroy$))
      .subscribe(user=> this.user = user);

    const apiUrl = this.tenantService.getApiUrl();
    this.http.get<{ logo_url: string | null; banner_url: string | null }>(
      `${apiUrl}/tenant/theme-config`
    ).pipe(takeUntil(this.destroy$)).subscribe({
      next: (config) => {
        this.bannerUrl = config.banner_url;
      }
    });
  }

  toggleSidebar(){
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector("body")?.classList.toggle("sidenav-toggled")
    }
  }

  getInitials(): string {
    const firstInitial = this.user?.first_name ? this.user.first_name.charAt(0).toUpperCase() : '';
    const lastInitial = this.user?.last_name ? this.user.last_name.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }

  logout():void {
    this.authService.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login'])
        },
        error: (err) => {
          console.log('logout error:', err)
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
