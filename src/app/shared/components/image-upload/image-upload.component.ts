import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MediaConfirmResponse, MediaService } from '../../services/media.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent implements OnChanges {
  /** 'member' uploads go to /members/me/media; 'tenant' go to /tenants/{entityId}/media */
  @Input() entityType: 'member' | 'tenant' = 'member';

  /** Required when entityType === 'tenant' */
  @Input() entityId: string | null = null;

  /** MediaLibrary collection name, e.g. 'avatar', 'logo', 'banner' */
  @Input() collection: string = 'avatar';

  /** Label displayed inside the dropzone */
  @Input() label: string = 'Drop image here or click to browse';

  /** Current CDN URL to display as existing image */
  @Input() currentUrl: string | null = null;

  /** Emitted with the CDN URLs after a successful upload */
  @Output() uploaded = new EventEmitter<MediaConfirmResponse>();

  /** Emitted when the user removes the image */
  @Output() removed = new EventEmitter<void>();

  private mediaService = inject(MediaService);

  previewUrl: string | null = null;
  uploadProgress = 0;
  isUploading = false;
  errorMessage = '';

  readonly maxSizeBytes = 5 * 1024 * 1024; // 5 MB
  readonly acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUrl']) {
      this.previewUrl = this.currentUrl;
    }
  }

  get displayUrl(): string | null {
    return this.previewUrl || this.currentUrl;
  }

  onSelect(event: { addedFiles: File[]; rejectedFiles: File[] }): void {
    this.errorMessage = '';

    if (!event.addedFiles.length) {
      if (event.rejectedFiles.length) {
        this.errorMessage = 'File rejected. Use JPEG, PNG or WebP under 5 MB.';
      }
      return;
    }

    const file = event.addedFiles[0];

    if (!this.acceptedTypes.includes(file.type)) {
      this.errorMessage = 'Only JPEG, PNG and WebP images are allowed.';
      return;
    }

    if (file.size > this.maxSizeBytes) {
      this.errorMessage = 'File is too large. Maximum size is 5 MB.';
      return;
    }

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => (this.previewUrl = e.target?.result as string);
    reader.readAsDataURL(file);

    this.uploadFile(file);
  }

  private uploadFile(file: File): void {
    this.isUploading = true;
    this.uploadProgress = 0;

    this.mediaService
      .uploadMedia(this.entityType, this.entityId, this.collection, file)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          }
          if (event.type === HttpEventType.Response && event.body) {
            this.isUploading = false;
            this.uploadProgress = 0;
            this.previewUrl = event.body.url;
            this.uploaded.emit(event.body);
          }
        },
        error: () => {
          this.isUploading = false;
          this.errorMessage = 'Upload failed. Please try again.';
        },
      });
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.mediaService
      .deleteMedia(this.entityType, this.entityId, this.collection)
      .subscribe({
        next: () => {
          this.previewUrl = null;
          this.removed.emit();
        },
        error: () => {
          this.errorMessage = 'Failed to remove image. Please try again.';
        },
      });
  }
}
