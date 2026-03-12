import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HymnLanguage } from 'src/app/shared/models/hymn';
import { HymnService } from 'src/app/shared/services/hymn.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hymn-languages',
  templateUrl: './hymn-languages.component.html',
  styleUrl: './hymn-languages.component.scss',
  standalone: false
})
export class HymnLanguagesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  languages: HymnLanguage[] = [];
  isLoading: boolean = true;

  constructor(public hymnService: HymnService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.isLoading = true;
    // Clear cache so hymns_count is always fresh
    this.localStorageService.remove('hymn_languages');
    this.hymnService.getAllLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: HymnLanguage[]) => {
          this.languages = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  deleteLanguage(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the language and all its hymns!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hymnService.deleteLanguage(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              Swal.fire('Deleted!', 'Language has been deleted.', 'success');
              this.loadLanguages();
            },
            error: () => {
              Swal.fire('Error!', 'Failed to delete language.', 'error');
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
