import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hymn, HymnLanguage } from 'src/app/shared/models/hymn';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hymn-favorites',
  templateUrl: './hymn-favorites.component.html',
  styleUrl: './hymn-favorites.component.scss',
  standalone: false
})
export class HymnFavoritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  favorites: Hymn[] = [];
  filteredFavorites: Hymn[] = [];
  languages: HymnLanguage[] = [];
  selectedLanguageId: number | null = null;
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(public hymnService: HymnService) {}

  ngOnInit(): void {
    this.loadLanguages();
    this.loadFavorites();
  }

  loadLanguages(): void {
    this.hymnService.getAllLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.languages = data;
      });
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.hymnService.getFavorites(this.selectedLanguageId || undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Hymn[]) => {
          this.favorites = data;
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  onLanguageChange(languageId: number | null): void {
    this.selectedLanguageId = languageId;
    this.loadFavorites();
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredFavorites = this.favorites.filter(hymn =>
        hymn.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hymn.hymn_number?.toString().includes(this.searchTerm)
      );
    } else {
      this.filteredFavorites = this.favorites;
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFilter();
  }

  removeFromFavorites(hymn: Hymn): void {
    Swal.fire({
      title: 'Remove from favorites?',
      text: `Remove "${hymn.title}" from your favorites?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hymnService.toggleFavorite(hymn.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.favorites = this.favorites.filter(f => f.id !== hymn.id);
              this.applyFilter();
              Swal.fire({
                icon: 'success',
                title: 'Removed from favorites',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
              });
            },
            error: () => {
              Swal.fire('Error!', 'Failed to remove from favorites.', 'error');
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
