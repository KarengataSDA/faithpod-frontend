import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Hymn } from 'src/app/shared/models/hymn';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HymnService } from 'src/app/shared/services/hymn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hymn',
  templateUrl: './view-hymn.component.html',
  styleUrl: './view-hymn.component.scss',
  standalone: false
})
export class ViewHymnComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  hymn: Hymn | null = null;
  isLoading: boolean = true;
  currentUser$: Observable<User | null>;

  constructor(
    private hymnService: HymnService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadHymn(id);
      }
    });
  }

  loadHymn(id: number): void {
    this.hymnService.getHymn(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hymn) => {
          this.hymn = hymn;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Error', 'Hymn not found', 'error');
          this.router.navigate(['/pages/hymns']);
        }
      });
  }

  toggleFavorite(): void {
    if (!this.hymn) return;

    this.hymnService.toggleFavorite(this.hymn.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (this.hymn) {
            this.hymn.is_favorite = response.is_favorite;
          }
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
