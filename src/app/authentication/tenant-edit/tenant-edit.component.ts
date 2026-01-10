import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

interface Tenant {
  id: string;
  name: string;
  email: string;
  domains?: Array<{ domain: string }>;
  created_at?: string;
}

@Component({
    selector: 'app-tenant-edit',
    templateUrl: './tenant-edit.component.html',
    styleUrls: ['./tenant-edit.component.scss'],
    standalone: false
})
export class TenantEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tenant: Tenant | null = null;
  editTenantForm: FormGroup;
  isLoading = false;
  isUpdating = false;
  errorMessage = '';
  successMessage = '';
  tenantId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editTenantForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domain: ['', Validators.required]
    });

    this.tenantId = this.route.snapshot.paramMap.get('id');
    if (this.tenantId) {
      this.loadTenant(this.tenantId);
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

          // Populate form with tenant data
          if (this.tenant) {
            this.editTenantForm.patchValue({
              name: this.tenant.name,
              email: this.tenant.email,
              domain: this.tenant.domains && this.tenant.domains.length > 0 ? this.tenant.domains[0].domain : ''
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }

  updateTenant(): void {
    if (this.editTenantForm.invalid || !this.tenantId) {
      Object.keys(this.editTenantForm.controls).forEach(key => {
        this.editTenantForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isUpdating = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http
      .put(`${this.apiUrl}/tenants/${this.tenantId}`, this.editTenantForm.getRawValue(), {
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
          this.isUpdating = false;

          Swal.fire({
            icon: 'success',
            title: 'Tenant updated successfully!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/tenants']);
          }, 1500);
        },
        error: () => {
          this.isUpdating = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/tenants']);
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
    console.error(error);
    return throwError(() => error);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
