import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HymnLanguage } from 'src/app/shared/models/hymn';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hymn',
  templateUrl: './edit-hymn.component.html',
  styleUrl: './edit-hymn.component.scss',
  standalone: false
})
export class EditHymnComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  languages: HymnLanguage[] = [];
  hymnId: number | null = null;
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hymnService: HymnService,
    private router: Router,
    private route: ActivatedRoute
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

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.hymnId = id;
        this.loadHymn(id);
      }
    });
  }

  loadLanguages(): void {
    this.hymnService.getAllLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.languages = data;
      });
  }

  loadHymn(id: number): void {
    this.hymnService.getHymn(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hymn) => {
          this.form.patchValue({
            hymn_language_id: hymn.language?.id,
            hymn_number: hymn.hymn_number,
            title: hymn.title,
            author: hymn.author,
            lyrics: hymn.lyrics
          });
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Error', 'Hymn not found', 'error');
          this.router.navigate(['/pages/hymns']);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.hymnId) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.hymnService.updateHymn(this.hymnId, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Hymn Updated',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/pages/hymns/view', this.hymnId]);
        },
        error: (error) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Failed to update hymn',
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
