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

  private destroy$ = new Subject<void>();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.getActivityLog()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => { this.entries = data; this.isLoading = false; },
        error: ()  => { this.isLoading = false; }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
