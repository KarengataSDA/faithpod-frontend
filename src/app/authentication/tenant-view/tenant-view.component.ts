import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tenant, TenantStatus } from '../tenant-management/tenant-management.component';

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  billing_cycle: string;
  max_members?: number;
  trial_days: number;
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
  plans: SubscriptionPlan[] = [];
  isLoading = false;
  isUpdating = false;
  isSavingSubscription = false;
  errorMessage = '';
  activeTab: string = 'details';
  showSubscriptionForm = false;

  // Subscription form fields
  subPlanId: number | null = null;
  subTrialEndsAt: string = '';
  subSubscriptionEndsAt: string = '';

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
    this.loadPlans();
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  get authToken(): string | null {
    return sessionStorage.getItem('central_admin_token');
  }

  loadTenant(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<Tenant>(`${this.apiUrl}/tenants/${id}`, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.tenant = response;
          this.syncFormFromTenant();
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }

  loadPlans(): void {
    this.http
      .get<SubscriptionPlan[]>(`${this.apiUrl}/plans`, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (plans) => { this.plans = plans; },
        error: () => {}
      });
  }

  /** Pre-fill form from current tenant values */
  syncFormFromTenant(): void {
    if (!this.tenant) return;
    this.subPlanId = this.tenant.plan_id ?? null;
    this.subTrialEndsAt        = this.tenant.trial_ends_at
      ? this.toDateInputValue(this.tenant.trial_ends_at) : '';
    this.subSubscriptionEndsAt = this.tenant.subscription_ends_at
      ? this.toDateInputValue(this.tenant.subscription_ends_at) : '';
  }

  /** Convert ISO string → YYYY-MM-DD for <input type="date"> */
  private toDateInputValue(iso: string): string {
    return iso ? iso.substring(0, 10) : '';
  }

  saveSubscription(): void {
    if (!this.tenant) return;

    const payload: any = {};
    if (this.subPlanId)              payload.plan_id              = this.subPlanId;
    if (this.subTrialEndsAt)         payload.trial_ends_at        = this.subTrialEndsAt;
    if (this.subSubscriptionEndsAt)  payload.subscription_ends_at = this.subSubscriptionEndsAt;

    if (Object.keys(payload).length === 0) return;

    this.isSavingSubscription = true;

    this.http
      .patch(`${this.apiUrl}/tenants/${this.tenant.id}/subscription`, payload, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
      .subscribe({
        next: (response: any) => {
          this.isSavingSubscription = false;
          this.tenant = response.data;
          this.showSubscriptionForm = false;
          Swal.fire({
            title: 'Saved!',
            text: 'Subscription details updated.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
        },
        error: () => {
          this.isSavingSubscription = false;
        }
      });
  }

  updateStatus(newStatus: TenantStatus): void {
    if (!this.tenant) return;

    const labels: Record<TenantStatus, string> = {
      active:    'Activate',
      suspended: 'Suspend',
      cancelled: 'Cancel Subscription',
      archived:  'Archive',
      trial:     'Set to Trial',
      past_due:  'Mark as Past Due',
      pending:   'Set to Pending',
    };

    const colors: Record<string, string> = {
      active:    '#28a745',
      suspended: '#dc3545',
      cancelled: '#6c757d',
      archived:  '#343a40',
    };

    Swal.fire({
      title: `${labels[newStatus]} Tenant?`,
      text: `Change the status of "${this.tenant.name}" to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: colors[newStatus] ?? '#175351',
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed || !this.tenant) return;

      this.isUpdating = true;

      this.http
        .patch(`${this.apiUrl}/tenants/${this.tenant.id}/status`, { status: newStatus }, {
          headers: { 'Authorization': `Bearer ${this.authToken}` }
        })
        .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
        .subscribe({
          next: (response: any) => {
            this.isUpdating = false;
            this.tenant = response.data;
            Swal.fire({
              title: 'Updated!',
              text: `Tenant status changed to "${newStatus}".`,
              icon: 'success',
              timer: 2000,
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

  getExpiryDate(): string | null {
    if (!this.tenant) return null;
    if (this.tenant.status === 'trial' && this.tenant.trial_ends_at) {
      return this.tenant.trial_ends_at;
    }
    if (this.tenant.subscription_ends_at) {
      return this.tenant.subscription_ends_at;
    }
    return null;
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

  setActiveTab(tab: string): void {
    this.activeTab = tab;
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
