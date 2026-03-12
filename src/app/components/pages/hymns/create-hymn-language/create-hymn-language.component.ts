import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-hymn-language',
  templateUrl: './create-hymn-language.component.html',
  styleUrl: './create-hymn-language.component.scss',
  standalone: false
})
export class CreateHymnLanguageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hymnService: HymnService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      is_active: [true]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.hymnService.createLanguage(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Language Created',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/pages/hymns/languages']);
        },
        error: (error) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Failed to create language',
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
    this.router.navigate(['/pages/hymns/languages']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
