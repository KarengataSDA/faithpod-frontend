import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '../../../../shared/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../../../shared/services/collection.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Member, MemberStatus, statusBadgeClass, statusLabel } from 'src/app/shared/models/member';
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
  collection: Collection;

  // Givings pagination
  currentPage = 1;
  readonly contributionPageSize = 10;
  isLoading: boolean = true;

  // Link Contributions tab
  unlinkedContributions: Contribution[] = [];
  selectedIds = new Set<number>();
  isLoadingUnlinked = false;

  get paginatedContributions() {
    const sorted = [...(this.member?.contributions ?? [])].sort((a, b) =>
      b.contribution_date.localeCompare(a.contribution_date)
    );
    const start = (this.currentPage - 1) * this.contributionPageSize;
    return sorted.slice(start, start + this.contributionPageSize);
  }

  get contributionTotalPages() {
    return Math.ceil((this.member?.contributions?.length ?? 0) / this.contributionPageSize);
  }

  onContributionPageChange(page: number) {
    if (page < 1 || page > this.contributionTotalPages) return;
    this.currentPage = page;
  }

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
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabChange(nextId: number): void {
    if (nextId === 3 && this.unlinkedContributions.length === 0 && !this.isLoadingUnlinked) {
      this.loadUnlinkedContributions();
    }
  }

  loadUnlinkedContributions(): void {
    this.isLoadingUnlinked = true;
    this.collectionService.getUnlinkedContributions(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { this.unlinkedContributions = data; this.isLoadingUnlinked = false; },
        error: () => { this.isLoadingUnlinked = false; }
      });
  }

  toggleId(id: number): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }

  get allUnlinkedSelected(): boolean {
    return this.unlinkedContributions.length > 0 && this.selectedIds.size === this.unlinkedContributions.length;
  }

  toggleAllUnlinked(checked: boolean): void {
    if (checked) {
      this.unlinkedContributions.forEach(c => this.selectedIds.add(c.id));
    } else {
      this.selectedIds.clear();
    }
  }

  linkSelected(): void {
    const count = this.selectedIds.size;
    if (count === 0) return;
    Swal.fire({
      title: `Link ${count} contribution${count > 1 ? 's' : ''} to ${this.member?.first_name}?`,
      text: 'These walk-in records will be permanently assigned to this member.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Link',
      confirmButtonColor: '#198754',
    }).then(result => {
      if (!result.isConfirmed) return;
      this.collectionService.linkContributions(this.id, [...this.selectedIds])
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.toast('success', res.message);
            const linked = new Set(this.selectedIds);
            this.unlinkedContributions = this.unlinkedContributions.filter(c => !linked.has(c.id));
            this.selectedIds.clear();
            // Refresh member so Givings tab reflects the newly linked contributions
            this.memberService.getUser(this.id)
              .pipe(takeUntil(this.destroy$))
              .subscribe((data: Member) => { this.member = data; });
          },
          error: () => this.toast('error', 'Failed to link contributions'),
        });
    });
  }

 
  badgeClass(status: MemberStatus | undefined): string {
    return statusBadgeClass(status);
  }

  getStatusLabel(status: MemberStatus | undefined): string {
    return statusLabel(status);
  }

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

  getRowspanForDate(index: number): number {
  const date = this.paginatedContributions[index]?.contribution_date
  return this.paginatedContributions.filter(c => c.contribution_date === date).length
}


  isFirstRowForDate(index: number): boolean {
  if (index === 0) return true
  const currentDate = this.paginatedContributions[index]?.contribution_date
  const prevDate = this.paginatedContributions[index - 1]?.contribution_date
  return currentDate !== prevDate
}

getDateNumber(index: number): number {
  let dateCount = 0
  let lastDate: string | null = null
  for (let i = 0; i <= index; i++) {
    const currentDate = this.paginatedContributions[i]?.contribution_date
    if (currentDate !== lastDate) {
      dateCount++
      lastDate = currentDate
    }
  }
  return (this.currentPage - 1) * this.contributionPageSize + dateCount
}

}
