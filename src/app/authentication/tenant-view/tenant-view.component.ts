import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Tenant {
  id: string;
  name: string;
  email: string;
  domains?: Array<{ domain: string }>;
  created_at?: string;
  brand_color?: string;
  accent_color?: string;
  background_color?: string;
  logo?: string;
}

@Component({
    selector: 'app-tenant-view',
    templateUrl: './tenant-view.component.html',
    styleUrls: ['./tenant-view.component.scss'],
    standalone: false
})
export class TenantViewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tenant: Tenant | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const tenantId = this.route.snapshot.paramMap.get('id');
    if (tenantId) {
      this.loadTenant(tenantId);
    }
  }

  get apiUrl(): string {
    return `http://127.0.0.1:${environment.apiPort}/api`;
  }

  get authToken(): string | null {
    return sessionStorage.getItem('central_admin_token');
  }

  loadTenant(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<Tenant>(`${this.apiUrl}/tenants/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      })
      .pipe(
        takeUntil(this.destroy$),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.tenant = response;
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/tenants']);
  }

  editTenant(): void {
    if (this.tenant) {
      this.router.navigate(['/tenants/edit', this.tenant.id]);
    }
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        this.errorMessage = 'Unable to connect to the server. Please check your network connection.';
      } else if (error.status === 401) {
        this.errorMessage = 'Unauthorized. Please login again.';
      } else if (error.status === 404) {
        this.errorMessage = 'Tenant not found.';
      } else {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
    console.error(error);
    return throwError(() => error);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
