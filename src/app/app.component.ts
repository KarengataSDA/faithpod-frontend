import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { fromEvent, Subject, timer } from 'rxjs';
import { takeUntil, filter, take } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private loaderRemoved = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    // Multi-strategy loader removal for iOS compatibility
    // Strategy 1: Remove on first successful navigation (most reliable)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => this.hideLoader());

    // Strategy 2: DOMContentLoaded (more reliable than 'load' on iOS)
    if (document.readyState === 'complete') {
      // Already loaded
      setTimeout(() => this.hideLoader(), 100);
    } else {
      fromEvent(document, 'DOMContentLoaded')
        .pipe(take(1), takeUntil(this.destroy$))
        .subscribe(() => this.hideLoader());
    }

    // Strategy 3: Failsafe timeout (prevents infinite loading on iOS)
    // If loader isn't removed after 5 seconds, force remove it
    timer(5000)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.loaderRemoved) {
          console.warn('Loader failsafe triggered - forcing loader removal');
          this.hideLoader();
        }
      });

    this.authService.initializeAuthState();
  }

  private hideLoader(): void {
    if (this.loaderRemoved) return;
    this.loaderRemoved = true;

    const loader = document.querySelector('#glb-loader');
    if (loader) {
      loader.classList.remove('loaderShow');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
