import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Announcement } from 'src/app/shared/models/announcement';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.scss',
  standalone: false,
})
export class CreateAnnouncementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  recentAnnouncements: Announcement[] = [];
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.loadRecentAnnouncements();
  }

  loadRecentAnnouncements(): void {
    this.isLoading = true;
    this.announcementService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Announcement[]) => {
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          this.recentAnnouncements = shuffled.slice(0, 4);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.imagePreview = null;
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

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('body', this.form.get('body')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.announcementService.create(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          Toast.fire({
            icon: 'success',
            title: 'Announcement Created Successfully',
          });
          this.router.navigate(['/pages/announcements']);
        },
        error: (error) => {
          this.isSubmitting = false;
          Toast.fire({
            icon: 'error',
            title: 'Failed to create announcement',
            text: error.error?.message || 'Something went wrong. Please try again later.',
          });
        }
      });
  }

  onDiscard(): void {
    this.router.navigate(['/pages/announcements']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
