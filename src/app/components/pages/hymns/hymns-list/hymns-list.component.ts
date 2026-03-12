import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hymn, HymnLanguage } from 'src/app/shared/models/hymn';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hymns-list',
  templateUrl: './hymns-list.component.html',
  styleUrl: './hymns-list.component.scss',
  standalone: false
})
export class HymnsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  hymns: Hymn[] = [];
  filteredHymns: Hymn[] = [];
  paginatedHymns: Hymn[] = [];
  languages: HymnLanguage[] = [];
  selectedLanguage: HymnLanguage | null = null;
  languageId: number | null = null;
  currentUser$: Observable<User | null>;

  // Pagination
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalLength = 0;
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    public hymnService: HymnService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    // Clear hymns cache so logged-in members always get correct is_favorite values
    this.hymnService.invalidateHymnsCache();
    this.loadLanguages();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const languageId = +params['languageId'];
      if (languageId) {
        this.languageId = languageId;
        this.loadHymnsByLanguage(languageId);
      } else {
        this.loadAllHymns();
      }
    });
  }

  loadLanguages(): void {
    this.hymnService.getAllLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.languages = data;
        if (this.languageId) {
          this.selectedLanguage = this.languages.find(l => l.id === this.languageId) || null;
        }
      });
  }

  loadAllHymns(): void {
    this.isLoading = true;
    this.hymnService.getAllHymns()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Hymn[]) => {
          this.hymns = data;
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  loadHymnsByLanguage(languageId: number): void {
    this.isLoading = true;
    this.hymnService.getHymnsByLanguage(languageId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Hymn[]) => {
          this.hymns = data;
          this.selectedLanguage = this.languages.find(l => l.id === languageId) || null;
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  onLanguageChange(languageId: number | null): void {
    this.languageId = languageId;
    this.currentPage = 1;
    if (languageId) {
      this.loadHymnsByLanguage(languageId);
    } else {
      this.loadAllHymns();
    }
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredHymns = this.hymns.filter(hymn =>
        hymn.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hymn.hymn_number?.toString().includes(this.searchTerm)
      );
    } else {
      this.filteredHymns = this.hymns;
    }

    this.totalLength = this.filteredHymns.length;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.updatePaginatedHymns();
  }

  updatePaginatedHymns(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHymns = this.filteredHymns.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedHymns();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  toggleFavorite(hymn: Hymn): void {
    this.hymnService.toggleFavorite(hymn.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          hymn.is_favorite = response.is_favorite;
          Swal.fire({
            icon: 'success',
            title: response.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update favorite',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
