import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
}

@Component({
    selector: 'app-tenant-management',
    templateUrl: './tenant-management.component.html',
    styleUrls: ['./tenant-management.component.scss'],
    standalone: false
})
export class TenantManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tenants: Tenant[] = [];
  createTenantForm: FormGroup;
  showCreateForm = false;
  isLoading = false;
  isCreating = false;
  isDeleting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createTenantForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domain: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loadTenants();
  }

  get apiUrl(): string {
    return `http://127.0.0.1:${environment.apiPort}/api`;
  }

  get authToken(): string | null {
    return sessionStorage.getItem('central_admin_token');
  }

  loadTenants(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<Tenant[]>(`${this.apiUrl}/tenants`, {
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
          this.tenants = response;
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 401) {
            this.router.navigate(['/central-admin/login']);
          }
        }
      });
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.showCreateForm) {
      this.createTenantForm.reset();
    }
  }

  createTenant(): void {
    if (this.createTenantForm.invalid) {
      Object.keys(this.createTenantForm.controls).forEach(key => {
        this.createTenantForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isCreating = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http
      .post(`${this.apiUrl}/tenants`, this.createTenantForm.getRawValue(), {
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
          this.isCreating = false;
          this.successMessage = 'Tenant created successfully!';
          this.createTenantForm.reset();
          this.showCreateForm = false;
          this.loadTenants();
        },
        error: () => {
          this.isCreating = false;
        }
      });
  }

  viewTenant(tenant: Tenant): void {
    this.router.navigate(['/tenants/view', tenant.id]);
  }

  openEditModal(tenant: Tenant): void {
    this.router.navigate(['/tenants/edit', tenant.id]);
  }

  deleteTenant(tenant: Tenant): void {
    if (!confirm(`Are you sure you want to delete "${tenant.name}"? This action cannot be undone.`)) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.http
      .delete(`${this.apiUrl}/tenants/${tenant.id}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      })
      .pipe(
        takeUntil(this.destroy$),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: () => {
          this.isDeleting = false;
          this.successMessage = 'Tenant deleted successfully!';
          this.loadTenants();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: () => {
          this.isDeleting = false;
        }
      });
  }

  logout(): void {
    sessionStorage.removeItem('central_admin_token');
    sessionStorage.removeItem('central_admin_user');
    this.router.navigate(['/auth/login']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        this.errorMessage = 'Unable to connect to the server. Please check your network connection.';
      } else if (error.status === 401) {
        this.errorMessage = 'Unauthorized. Please login again.';
      } else if (error.status === 422) {
        if (error.error.errors) {
          const errors = Object.values(error.error.errors).flat();
          this.errorMessage = errors.join(' ');
        } else {
          this.errorMessage = error.error.message || 'Validation error occurred.';
        }
      } else {
        errorMessage = `Server error: ${error.status} - ${error.message}`;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
    console.error(errorMessage);
    return throwError(() => error);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
