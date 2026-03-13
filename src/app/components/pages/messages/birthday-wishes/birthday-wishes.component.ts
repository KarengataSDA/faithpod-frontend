import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BirthdayWish, BirthdayWishesResponse } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-birthday-wishes',
  templateUrl: './birthday-wishes.component.html',
  styleUrl: './birthday-wishes.component.scss',
  standalone: false
})
export class BirthdayWishesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  birthdayWishes: BirthdayWish[] = [];
  summary = {
    total_wishes_sent: 0,
    total_recipients: 0,
    total_sms_sent: 0,
    total_emails_sent: 0
  };

  paginatedWishes: BirthdayWish[] = [];
  filteredWishes: BirthdayWish[] = [];
  totalLength = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  searchTerm: string = '';
  isLoading: boolean = true;

  // Date filters
  fromDate: string = '';
  toDate: string = '';

  // Expanded row tracking
  expandedRowId: number | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadBirthdayWishes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBirthdayWishes(): void {
    this.isLoading = true;
    this.messageService.getBirthdayWishes(this.fromDate, this.toDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: BirthdayWishesResponse) => {
          this.summary = response.summary;
          this.birthdayWishes = response.birthday_wishes;
          this.applyFilter();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading birthday wishes:', error);
          this.isLoading = false;
        }
      });
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredWishes = this.birthdayWishes.filter(wish =>
        wish.recipients?.some(r =>
          r.first_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          r.last_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          r.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          r.phone_number?.includes(this.searchTerm)
        )
      );
    } else {
      this.filteredWishes = this.birthdayWishes;
    }

    this.totalLength = this.filteredWishes.length;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedWishes();
  }

  updatePaginatedWishes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedWishes = this.filteredWishes.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedWishes();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  onDateFilterChange(): void {
    this.loadBirthdayWishes();
  }

  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.searchTerm = '';
    this.loadBirthdayWishes();
  }

  toggleRecipients(wishId: number): void {
    this.expandedRowId = this.expandedRowId === wishId ? null : wishId;
  }

  getDeliveryRate(wish: BirthdayWish): number {
    const totalAttempts = wish.successful_sms + wish.failed_sms +
                          wish.successful_emails + wish.failed_emails;
    if (totalAttempts === 0) return 0;
    const successful = wish.successful_sms + wish.successful_emails;
    return Math.round((successful / totalAttempts) * 100);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
