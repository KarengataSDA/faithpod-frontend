import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberAudit, MemberStatus, statusBadgeClass, statusLabel } from 'src/app/shared/models/member';
import { MemberService } from 'src/app/shared/services/member.service';

@Component({
  selector: 'app-member-activity-log',
  templateUrl: './member-activity-log.component.html',
  styleUrls: ['./member-activity-log.component.scss'],
  standalone: false
})
export class MemberActivityLogComponent implements OnInit, OnDestroy {
  entries: MemberAudit[] = [];
  isLoading = true;
  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 50;

  private destroy$ = new Subject<void>();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void { this.load(); }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load(page = 1): void {
    this.isLoading = true;
    this.memberService.getActivityLog(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.entries     = res.data;
          this.currentPage = res.current_page;
          this.lastPage    = res.last_page;
          this.total       = res.total;
          this.perPage     = res.per_page;
          this.isLoading   = false;
        },
        error: () => { this.isLoading = false; }
      });
  }

  prevPage(): void { if (this.currentPage > 1) this.load(this.currentPage - 1); }
  nextPage(): void { if (this.currentPage < this.lastPage) this.load(this.currentPage + 1); }

  get from(): number { return (this.currentPage - 1) * this.perPage + 1; }
  get to(): number   { return Math.min(this.currentPage * this.perPage, this.total); }

  badgeClass(status: MemberStatus | undefined): string {
    return statusBadgeClass(status);
  }

  getStatusLabel(status: MemberStatus | undefined): string {
    return statusLabel(status);
  }

  actionLabel(action: string | null): string {
    const map: Record<string, string> = {
      invite_sent:     'Invite Sent',
      invite_accepted: 'Invite Accepted',
      self_registered: 'Self Registered',
      verified:        'Verified',
      rejected:        'Rejected',
      suspended:       'Suspended',
      reactivated:     'Reactivated',
      profile_updated: 'Profile Updated',
    };
    return action ? (map[action] ?? action) : '—';
  }
}
