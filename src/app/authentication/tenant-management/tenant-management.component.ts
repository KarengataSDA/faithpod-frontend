import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

export type TenantStatus = 'pending' | 'trial' | 'active' | 'past_due' | 'suspended' | 'cancelled' | 'archived';

export interface Tenant {
  id: string;
  name: string;
  email: string;
  status: TenantStatus;
  is_active: boolean;
  billing_email?: string;
  trial_ends_at?: string;
  subscription_ends_at?: string;
  grace_ends_at?: string;
  suspended_at?: string;
  plan_id?: number;
  plan?: { id: number; name: string; price: number; billing_cycle: string; max_members?: number };
  domains?: Array<{ id: number; domain: string }>;
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
  isUpdating = false;
  showPassword = false;
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
      domain: ['', [Validators.required, Validators.pattern(/^[a-z0-9][a-z0-9-]*\.[a-z0-9.-]+$/i)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loadTenants();
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  get authToken(): string | null {
    return sessionStorage.getItem('central_admin_token');
  }

  loadTenants(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<Tenant[]>(`${this.apiUrl}/tenants`, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
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
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
      .subscribe({
        next: () => {
          this.isCreating = false;
          this.successMessage = 'Tenant created successfully! They are now in trial status.';
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

  archiveTenant(tenant: Tenant): void {
    Swal.fire({
      title: 'Archive Tenant?',
      html: `You are about to archive <strong>${tenant.name}</strong>.<br>All data will be preserved. Access will be disabled.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#adb5bd',
      confirmButtonText: 'Yes, archive it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isUpdating = true;
      this.errorMessage = '';

      this.http
        .patch(`${this.apiUrl}/tenants/${tenant.id}/status`, { status: 'archived' }, {
          headers: { 'Authorization': `Bearer ${this.authToken}` }
        })
        .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
        .subscribe({
          next: () => {
            this.isUpdating = false;
            this.loadTenants();
            Swal.fire({
              title: 'Archived!',
              text: `${tenant.name} has been archived. Data is preserved.`,
              icon: 'success',
              timer: 2500,
              showConfirmButton: false,
            });
          },
          error: () => {
            this.isUpdating = false;
          }
        });
    });
  }

  getStatusBadgeClass(status: TenantStatus): string {
    const map: Record<TenantStatus, string> = {
      trial:     'bg-info text-white',
      active:    'bg-success text-white',
      past_due:  'bg-warning text-dark',
      suspended: 'bg-danger text-white',
      cancelled: 'bg-secondary text-white',
      archived:  'bg-dark text-white',
      pending:   'bg-light text-dark border',
    };
    return map[status] ?? 'bg-secondary text-white';
  }

  getStatusLabel(status: TenantStatus): string {
    const map: Record<TenantStatus, string> = {
      trial:     'Trial',
      active:    'Active',
      past_due:  'Past Due',
      suspended: 'Suspended',
      cancelled: 'Cancelled',
      archived:  'Archived',
      pending:   'Pending',
    };
    return map[status] ?? status;
  }

  logout(): void {
    sessionStorage.removeItem('central_admin_token');
    sessionStorage.removeItem('central_admin_user');
    this.router.navigate(['/auth/login']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        this.errorMessage = 'Unable to connect to the server. Please check your network connection.';
      } else if (error.status === 401) {
        this.errorMessage = 'Unauthorized. Please login again.';
      } else if (error.status === 422) {
        if (error.error.errors) {
          const errors = Object.values(error.error.errors).flat();
          this.errorMessage = (errors as string[]).join(' ');
        } else {
          this.errorMessage = error.error.message || 'Validation error occurred.';
        }
      } else {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
    return throwError(() => error);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
