import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CentralHymnalService } from 'src/app/shared/services/central-hymnal.service';
import { HymnLanguage } from 'src/app/shared/models/hymn';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hymnal-languages',
  templateUrl: './hymnal-languages.component.html',
  styleUrls: ['./hymnal-languages.component.scss'],
  standalone: false,
})
export class HymnalLanguagesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  languages: HymnLanguage[] = [];
  isLoading = false;

  showForm = false;
  isSubmitting = false;
  editingId: number | null = null;
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private hymnalService: CentralHymnalService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadLanguages();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      is_active: [true],
    });
  }

  loadLanguages(): void {
    this.isLoading = true;
    this.hymnalService
      .getLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.languages = data;
          this.isLoading = false;
        },
        error: () => { this.isLoading = false; },
      });
  }

  openCreate(): void {
    this.editingId = null;
    this.form.reset({ name: '', description: '', is_active: true });
    this.showForm = true;
  }

  openEdit(lang: HymnLanguage): void {
    this.editingId = lang.id;
    this.form.patchValue({ name: lang.name, description: lang.description, is_active: lang.is_active });
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const request$ = this.editingId
      ? this.hymnalService.updateLanguage(this.editingId, this.form.value)
      : this.hymnalService.createLanguage(this.form.value);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showForm = false;
        this.editingId = null;
        Swal.fire({ icon: 'success', title: 'Saved!', timer: 1500, showConfirmButton: false });
        this.loadLanguages();
      },
      error: () => { this.isSubmitting = false; },
    });
  }

  delete(lang: HymnLanguage): void {
    Swal.fire({
      title: `Delete "${lang.name}"?`,
      text: 'This will also delete all hymns in this language.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.hymnalService
        .deleteLanguage(lang.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false });
            this.languages = this.languages.filter((l) => l.id !== lang.id);
          },
          error: () => Swal.fire('Error', 'Failed to delete language.', 'error'),
        });
    });
  }

  viewHymns(lang: HymnLanguage): void {
    this.router.navigate(['/hymnal/hymns'], {
      queryParams: { language_id: lang.id, language_name: lang.name },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
