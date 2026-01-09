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

  constructor(
    private authService: AuthService,
    public navServices: NavService,
    private router: Router,
  ){ }

  ngOnInit(): void {
    Auth.userEmitter
      .pipe(takeUntil(this.destroy$))
      .subscribe(user=> this.user = user)
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
