import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  standalone: false
})
export class MessagesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  messages: Message[] = [];

  paginatedMessages: Message[] = [];
  filteredMessages: Message[] = [];
  totalLength = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Message[]) => {
          this.messages = data.sort((a, b) =>
            new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
          );
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredMessages = this.messages.filter(message =>
        message.subject?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        message.message?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredMessages = this.messages;
    }

    this.totalLength = this.filteredMessages.length;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedMessages();
  }

  updatePaginatedMessages(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMessages = this.filteredMessages.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedMessages();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  getChannelBadgeClass(channel: string): string {
    switch (channel) {
      case 'sms': return 'bg-info';
      case 'email': return 'bg-primary';
      case 'both': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  getRecipientTypeLabel(type: string): string {
    switch (type) {
      case 'all': return 'All Members';
      case 'group': return 'Group';
      case 'prayercell': return 'Prayer Cell';
      case 'individual': return 'Individual';
      default: return type;
    }
  }

  getDeliveryRate(message: Message): number {
    const totalAttempts = message.successful_sms + message.failed_sms +
                          message.successful_emails + message.failed_emails;
    if (totalAttempts === 0) return 0;
    const successful = message.successful_sms + message.successful_emails;
    return Math.round((successful / totalAttempts) * 100);
  }
}
