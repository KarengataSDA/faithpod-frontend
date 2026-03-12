import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HymnLanguage } from 'src/app/shared/models/hymn';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-hymn',
  templateUrl: './create-hymn.component.html',
  styleUrl: './create-hymn.component.scss',
  standalone: false
})
export class CreateHymnComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  languages: HymnLanguage[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hymnService: HymnService,
    private router: Router
  ) {
    this.form = this.fb.group({
      hymn_language_id: ['', Validators.required],
      hymn_number: ['', [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: [''],
      lyrics: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.hymnService.getAllLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.languages = data.filter(l => l.is_active);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.hymnService.createHymn(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hymn) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Hymn Created',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/pages/hymns/view', hymn.id]);
        },
        error: (error) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Failed to create hymn',
            text: error.error?.message || 'Something went wrong.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
  }

  onDiscard(): void {
    this.router.navigate(['/pages/hymns']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
