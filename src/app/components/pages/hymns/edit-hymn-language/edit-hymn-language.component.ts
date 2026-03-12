import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hymn-language',
  templateUrl: './edit-hymn-language.component.html',
  styleUrl: './edit-hymn-language.component.scss',
  standalone: false
})
export class EditHymnLanguageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  languageId: number | null = null;
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hymnService: HymnService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      is_active: [true]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.languageId = id;
        this.loadLanguage(id);
      }
    });
  }

  loadLanguage(id: number): void {
    this.hymnService.getLanguage(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (language) => {
          this.form.patchValue({
            name: language.name,
            description: language.description,
            is_active: language.is_active
          });
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Error', 'Language not found', 'error');
          this.router.navigate(['/pages/hymns/languages']);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.languageId) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.hymnService.updateLanguage(this.languageId, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Language Updated',
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
            title: 'Failed to update language',
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
