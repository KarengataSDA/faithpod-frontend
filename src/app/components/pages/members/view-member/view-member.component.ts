import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '../../../../shared/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../../../shared/services/collection.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Member, MemberAudit, MemberStatus, statusBadgeClass, statusLabel } from 'src/app/shared/models/member';
import { Collection, Contribution } from 'src/app/shared/models/collection';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-member',
    templateUrl: './view-member.component.html',
    styleUrls: ['./view-member.component.scss'],
    standalone: false
})
export class ViewMemberComponent implements OnInit, OnDestroy {
  id!: number;
  member: Member | null = null;
  auditTrail: MemberAudit[] = [];
  isLoadingAudit = false;
  collection: Collection;

  private destroy$ = new Subject<void>();

  constructor(
    public memberService: MemberService,
    public collectionService: CollectionService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['memberId'];
    this.memberService.getUser(this.id).subscribe((data: Member) => {
      this.member = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Status helpers ────────────────────────────────────────────────────────

  badgeClass(status: MemberStatus | undefined): string {
    return statusBadgeClass(status);
  }

  getStatusLabel(status: MemberStatus | undefined): string {
    return statusLabel(status);
  }

  // ── Audit trail ───────────────────────────────────────────────────────────

  loadAuditTrail(): void {
    if (this.auditTrail.length > 0) return;
    this.isLoadingAudit = true;
    this.memberService.getAuditTrail(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => { this.auditTrail = data; this.isLoadingAudit = false; },
        error: () => { this.isLoadingAudit = false; }
      });
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

  // ── Status actions ────────────────────────────────────────────────────────

  verifyMember(): void {
    Swal.fire({
      title: 'Verify this member?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Verify',
      confirmButtonColor: '#198754',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.verify(this.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.member = { ...this.member!, ...updated };
            this.auditTrail = [];
            this.toast('success', 'Member verified successfully');
          });
      }
    });
  }

  rejectMember(): void {
    Swal.fire({
      title: 'Reject this member?',
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      confirmButtonColor: '#dc3545',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.reject(this.id, result.value || '')
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.member = { ...this.member!, ...updated };
            this.auditTrail = [];
            this.toast('success', 'Member rejected');
          });
      }
    });
  }

  suspendMember(): void {
    Swal.fire({
      title: 'Suspend this member?',
      input: 'textarea',
      inputLabel: 'Reason for suspension',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Suspend',
      confirmButtonColor: '#fd7e14',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.suspend(this.id, result.value || '')
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.member = { ...this.member!, ...updated };
            this.auditTrail = [];
            this.toast('success', 'Member suspended');
          });
      }
    });
  }

  reactivateMember(): void {
    Swal.fire({
      title: 'Reactivate this member?',
      text: 'Status will return to Pending Review.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reactivate',
      confirmButtonColor: '#0d6efd',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.reactivate(this.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.member = { ...this.member!, ...updated };
            this.auditTrail = [];
            this.toast('success', 'Member reactivated');
          });
      }
    });
  }

  resendInvite(): void {
    this.memberService.resendInvite(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.toast('success', 'Invite resent successfully'));
  }

  // ── Contributions ─────────────────────────────────────────────────────────

  getRowspan(contributions: Contribution[], date: string): number {
    return contributions.filter(c => c.contribution_date === date).length;
  }

  sendMail(id: number): void {
    this.collectionService.sendMail(id).subscribe(() => {
      window.location.reload();
    });
  }

  private toast(icon: 'success' | 'error' | 'warning', title: string): void {
    Swal.mixin({
      toast: true, position: 'top-end',
      showConfirmButton: false, timer: 2500, timerProgressBar: true,
    }).fire({ icon, title });
  }
}
