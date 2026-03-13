import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.scss',
  standalone: false
})
export class ViewMessageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  message: Message | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMessage(+id);
    } else {
      this.error = 'Invalid message ID';
      this.isLoading = false;
    }
  }

  loadMessage(id: number): void {
    this.messageService.find(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.message = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load message';
          this.isLoading = false;
        }
      });
  }

  get channelLabel(): string {
    switch (this.message?.channel) {
      case 'sms': return 'SMS Only';
      case 'email': return 'Email Only';
      case 'both': return 'SMS & Email';
      default: return '';
    }
  }

  get recipientTypeLabel(): string {
    switch (this.message?.recipient_type) {
      case 'all': return 'All Members';
      case 'group': return 'Specific Group(s)';
      case 'prayercell': return 'Specific Prayer Cell(s)';
      case 'individual': return 'Individual Member(s)';
      default: return '';
    }
  }

  get totalSuccessful(): number {
    if (!this.message) return 0;
    return this.message.successful_sms + this.message.successful_emails;
  }

  get totalFailed(): number {
    if (!this.message) return 0;
    return this.message.failed_sms + this.message.failed_emails;
  }

  get deliveryRate(): number {
    const total = this.totalSuccessful + this.totalFailed;
    if (total === 0) return 0;
    return Math.round((this.totalSuccessful / total) * 100);
  }

  goBack(): void {
    this.router.navigate(['/pages/messages']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
