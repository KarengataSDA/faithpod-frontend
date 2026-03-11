import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Announcement } from 'src/app/shared/models/announcement';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  standalone: false
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  announcements: Announcement[] = [];
  recentAnnouncements: Announcement[] = [];

  paginatedAnnouncements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  totalLength = 0;
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(public announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Announcement[]) => {
        this.announcements = data;
        this.recentAnnouncements = this.getRandomAnnouncements(data, 5);
        this.applyFilter();
        this.isLoading = false;
      });
  }

  getRandomAnnouncements(arr: Announcement[], count: number): Announcement[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredAnnouncements = this.announcements.filter(announcement =>
        announcement.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        announcement.body?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAnnouncements = this.announcements;
    }

    this.totalLength = this.filteredAnnouncements.length;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.updatePaginatedAnnouncements();
  }

  updatePaginatedAnnouncements(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAnnouncements = this.filteredAnnouncements.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedAnnouncements();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.applyFilter();
  }
}
