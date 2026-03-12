import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

export interface SubscriptionPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  billing_cycle: 'monthly' | 'yearly' | 'lifetime';
  max_members: number | null;
  trial_days: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss'],
  standalone: false
})
export class SubscriptionPlansComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  plans: SubscriptionPlan[] = [];
  isLoading = false;
  isSaving = false;
  isTogglingId: number | null = null;
  errorMessage = '';
  successMessage = '';

  showForm = false;
  editingPlan: SubscriptionPlan | null = null;
  planForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.planForm = this.fb.group({
      name:          ['', Validators.required],
      slug:          ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      description:   [''],
      price:         [0, [Validators.required, Validators.min(0)]],
      billing_cycle: ['monthly', Validators.required],
      max_members:   [null],
      trial_days:    [14, [Validators.required, Validators.min(0)]],
      sort_order:    [0, [Validators.required, Validators.min(0)]],
      is_active:     [true],
    });

    this.loadPlans();
  }

  get apiUrl(): string { return environment.apiUrl; }
  get authToken(): string | null { return sessionStorage.getItem('central_admin_token'); }

  loadPlans(): void {
    this.isLoading = true;
    this.http
      .get<SubscriptionPlan[]>(`${this.apiUrl}/plans`, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
      .subscribe({
        next: (plans) => { this.isLoading = false; this.plans = plans; },
        error: () => { this.isLoading = false; }
      });
  }

  openCreate(): void {
    this.editingPlan = null;
    this.planForm.reset({
      name: '', slug: '', description: '', price: 0,
      billing_cycle: 'monthly', max_members: null,
      trial_days: 14, sort_order: this.plans.length + 1, is_active: true
    });
    this.showForm = true;
    this.errorMessage = '';
  }

  openEdit(plan: SubscriptionPlan): void {
    this.editingPlan = plan;
    this.planForm.patchValue({
      name:          plan.name,
      slug:          plan.slug,
      description:   plan.description ?? '',
      price:         parseFloat(plan.price),
      billing_cycle: plan.billing_cycle,
      max_members:   plan.max_members,
      trial_days:    plan.trial_days,
      sort_order:    plan.sort_order,
      is_active:     plan.is_active,
    });
    this.showForm = true;
    this.errorMessage = '';
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingPlan = null;
    this.errorMessage = '';
  }

  savePlan(): void {
    if (this.planForm.invalid) {
      Object.keys(this.planForm.controls).forEach(k => this.planForm.get(k)?.markAsTouched());
      return;
    }

    const payload = { ...this.planForm.getRawValue() };
    if (!payload.max_members) payload.max_members = null;

    this.isSaving = true;
    this.errorMessage = '';

    const req$ = this.editingPlan
      ? this.http.put(`${this.apiUrl}/plans/${this.editingPlan.id}`, payload, {
          headers: { 'Authorization': `Bearer ${this.authToken}` }
        })
      : this.http.post(`${this.apiUrl}/plans`, payload, {
          headers: { 'Authorization': `Bearer ${this.authToken}` }
        });

    const isEditing = !!this.editingPlan;
    req$
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.showForm = false;
          this.editingPlan = null;
          this.successMessage = isEditing ? 'Plan updated.' : 'Plan created.';
          this.loadPlans();
        },
        error: () => { this.isSaving = false; }
      });
  }

  deletePlan(plan: SubscriptionPlan): void {
    Swal.fire({
      title: 'Delete Plan?',
      text: `"${plan.name}" will be permanently deleted.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#d33',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.http
        .delete(`${this.apiUrl}/plans/${plan.id}`, {
          headers: { 'Authorization': `Bearer ${this.authToken}` }
        })
        .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
        .subscribe({
          next: () => {
            this.plans = this.plans.filter(p => p.id !== plan.id);
            this.successMessage = `Plan "${plan.name}" deleted.`;
          },
          error: () => {}
        });
    });
  }

  toggleActive(plan: SubscriptionPlan): void {
    this.isTogglingId = plan.id;
    this.http
      .patch(`${this.apiUrl}/plans/${plan.id}/toggle`, {}, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      })
      .pipe(takeUntil(this.destroy$), catchError(this.handleError.bind(this)))
      .subscribe({
        next: (updated: any) => {
          this.isTogglingId = null;
          const idx = this.plans.findIndex(p => p.id === plan.id);
          if (idx !== -1) this.plans[idx] = updated;
        },
        error: () => { this.isTogglingId = null; }
      });
  }

  autoSlug(): void {
    if (this.editingPlan) return; // don't auto-update slug when editing
    const name: string = this.planForm.get('name')?.value ?? '';
    this.planForm.get('slug')?.setValue(
      name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    );
  }

  logout(): void {
    sessionStorage.removeItem('central_admin_token');
    sessionStorage.removeItem('central_admin_user');
    this.router.navigate(['/auth/login']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/auth/login']);
    } else if (error.status === 422 && error.error?.errors) {
      const errs = Object.values(error.error.errors).flat() as string[];
      this.errorMessage = errs.join(' ');
    } else {
      this.errorMessage = error.error?.message ?? 'An error occurred. Please try again.';
    }
    return throwError(() => error);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
