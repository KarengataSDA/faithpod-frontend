import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Announcement } from 'src/app/shared/models/announcement';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrl: './view-announcement.component.scss',
  standalone: false,
})
export class ViewAnnouncementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  announcement: Announcement | null = null;
  recentAnnouncements: Announcement[] = [];
  isLoading: boolean = true;
  isDeleting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = +params['announcementId'];
      if (id) {
        this.loadAnnouncement(id);
        this.loadRecentAnnouncements(id);
      }
    });
  }

  loadAnnouncement(id: number): void {
    this.isLoading = true;
    this.announcementService.find(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Announcement) => {
          this.announcement = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.router.navigate(['/pages/announcements']);
        }
      });
  }

  loadRecentAnnouncements(currentId: number): void {
    this.announcementService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Announcement[]) => {
          const filtered = data.filter(a => a.id !== currentId);
          const shuffled = [...filtered].sort(() => Math.random() - 0.5);
          this.recentAnnouncements = shuffled.slice(0, 4);
        }
      });
  }

  onEdit(): void {
    if (this.announcement) {
      this.router.navigate(['/pages/announcements/edit', this.announcement.id]);
    }
  }

  onDelete(): void {
    if (!this.announcement || this.isDeleting) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeleting = true;
        this.announcementService.delete(this.announcement!.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Announcement has been deleted.",
                icon: "success"
              });
              this.router.navigate(['/pages/announcements']);
            },
            error: () => {
              this.isDeleting = false;
              Swal.fire({
                title: "Error!",
                text: "Failed to delete announcement.",
                icon: "error"
              });
            }
          });
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/pages/announcements']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
