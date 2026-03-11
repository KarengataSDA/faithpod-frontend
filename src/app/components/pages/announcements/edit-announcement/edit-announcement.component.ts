import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Announcement } from 'src/app/shared/models/announcement';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { MediaConfirmResponse } from 'src/app/shared/services/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrl: './edit-announcement.component.scss',
  standalone: false,
})
export class EditAnnouncementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  announcement: Announcement | null = null;
  recentAnnouncements: Announcement[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  announcementId: number | null = null;
  currentImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private announcementService: AnnouncementService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.announcementId = id;
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
          this.form.patchValue({ title: data.title, body: data.body });
          this.currentImageUrl = data.image ?? null;
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

  onImageUploaded(response: MediaConfirmResponse): void {
    this.currentImageUrl = response.url;
    this.announcementService.invalidateCache();
  }

  onImageRemoved(): void {
    this.currentImageUrl = null;
    this.announcementService.invalidateCache();
  }

  onSubmit(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    if (this.form.invalid || !this.announcementId) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.announcementService.update(this.announcementId, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          Toast.fire({ icon: 'success', title: 'Announcement Updated Successfully' });
          this.router.navigate(['/pages/announcements/view', this.announcementId]);
        },
        error: (error) => {
          this.isSubmitting = false;
          Toast.fire({
            icon: 'error',
            title: 'Failed to update announcement',
            text: error.error?.message || 'Something went wrong. Please try again later.',
          });
        }
      });
  }

  onCancel(): void {
    if (this.announcementId) {
      this.router.navigate(['/pages/announcements/view', this.announcementId]);
    } else {
      this.router.navigate(['/pages/announcements']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
