import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CentralHymnalService } from 'src/app/shared/services/central-hymnal.service';
import { Hymn, HymnLanguage } from 'src/app/shared/models/hymn';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hymnal-hymns',
  templateUrl: './hymnal-hymns.component.html',
  styleUrls: ['./hymnal-hymns.component.scss'],
  standalone: false,
})
export class HymnalHymnsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  hymns: Hymn[] = [];
  filteredHymns: Hymn[] = [];
  paginatedHymns: Hymn[] = [];
  languages: HymnLanguage[] = [];
  selectedLanguageId: number | null = null;
  selectedLanguageName: string = '';
  searchTerm: string = '';
  isLoading = false;

  // Pagination
  pageSize = 15;
  currentPage = 1;
  totalPages = 0;

  // Form
  showForm = false;
  isSubmitting = false;
  editingId: number | null = null;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private hymnalService: CentralHymnalService
  ) {}

  ngOnInit(): void {
    const langId = this.route.snapshot.queryParamMap.get('language_id');
    this.selectedLanguageName = this.route.snapshot.queryParamMap.get('language_name') ?? '';

    if (langId) {
      this.selectedLanguageId = +langId;
    }

    this.buildForm();
    this.loadLanguages();
    this.loadHymns();
  }

  buildForm(): void {
    this.form = this.fb.group({
      hymn_language_id: [this.selectedLanguageId, Validators.required],
      hymn_number: [null, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: [''],
      lyrics: ['', Validators.required],
    });
  }

  loadLanguages(): void {
    this.hymnalService
      .getLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (data) => (this.languages = data) });
  }

  loadHymns(): void {
    this.isLoading = true;
    this.hymnalService
      .getHymns(this.selectedLanguageId ?? undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.hymns = data;
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => { this.isLoading = false; },
      });
  }

  onLanguageChange(): void {
    this.currentPage = 1;
    this.loadHymns();
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredHymns = term
      ? this.hymns.filter(
          (h) =>
            h.title?.toLowerCase().includes(term) ||
            h.hymn_number?.toString().includes(term) ||
            h.author?.toLowerCase().includes(term)
        )
      : [...this.hymns];

    this.totalPages = Math.ceil(this.filteredHymns.length / this.pageSize);
    this.updatePage();
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedHymns = this.filteredHymns.slice(start, start + this.pageSize);
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  get visiblePages(): (number | null)[] {
    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    const pages: (number | null)[] = [];
    const left = Math.max(2, this.currentPage - 1);
    const right = Math.min(this.totalPages - 1, this.currentPage + 1);
    pages.push(1);
    if (left > 2) pages.push(null);
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < this.totalPages - 1) pages.push(null);
    pages.push(this.totalPages);
    return pages;
  }

  openCreate(): void {
    this.editingId = null;
    this.form.reset({
      hymn_language_id: this.selectedLanguageId ?? null,
      hymn_number: null,
      title: '',
      author: '',
      lyrics: '',
    });
    this.showForm = true;
  }

  openEdit(hymn: Hymn): void {
    this.editingId = hymn.id;
    this.form.patchValue({
      hymn_language_id: (hymn.language as any)?.id ?? this.selectedLanguageId,
      hymn_number: hymn.hymn_number,
      title: hymn.title,
      author: hymn.author ?? '',
      lyrics: hymn.lyrics,
    });
    this.showForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      ? this.hymnalService.updateHymn(this.editingId, this.form.value)
      : this.hymnalService.createHymn(this.form.value);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showForm = false;
        this.editingId = null;
        Swal.fire({ icon: 'success', title: 'Saved!', timer: 1500, showConfirmButton: false });
        this.loadHymns();
      },
      error: (err) => {
        this.isSubmitting = false;
        const msg = err?.error?.message ?? 'Failed to save hymn.';
        Swal.fire('Error', msg, 'error');
      },
    });
  }

  delete(hymn: Hymn): void {
    Swal.fire({
      title: `Delete "${hymn.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.hymnalService
        .deleteHymn(hymn.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false });
            this.hymns = this.hymns.filter((h) => h.id !== hymn.id);
            this.applyFilter();
          },
          error: () => Swal.fire('Error', 'Failed to delete hymn.', 'error'),
        });
    });
  }

  goToLanguages(): void {
    this.router.navigate(['/hymnal/languages']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
