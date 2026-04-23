import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from '../../../../shared/services/member.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Member, MemberStatus, statusBadgeClass, statusLabel } from 'src/app/shared/models/member';

type StatusTab = MemberStatus | 'all';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    standalone: false,
})
export class MembersComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  paginatedMembers: Member[] = [];

  activeTab: StatusTab = 'all';
  searchTerm = '';
  isLoading = true;

  currentPage = 1;
  pageSize = 20;
  totalLength = 0;
  totalPages = 0;

  readonly tabs: { key: StatusTab; label: string }[] = [
    { key: 'all',             label: 'All' },
    { key: 'verified',        label: 'Verified' },
    { key: 'pending_review',  label: 'Pending Review' },
    { key: 'invited',         label: 'Invited' },
    { key: 'self_registered', label: 'Self Registered' },
    { key: 'rejected',        label: 'Rejected' },
    { key: 'suspended',       label: 'Suspended' },
  ];

  private destroy$ = new Subject<void>();

  constructor(public memberService: MemberService, public authService: AuthService) {}

  ngOnInit(): void {
    this.memberService.getAllFresh()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Member[]) => {
        this.members = data;
        this.applyFilter();
        this.isLoading = false;
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

  countForTab(tab: StatusTab): number {
    if (tab === 'all') return this.members.length;
    return this.members.filter(m => m.status === tab).length;
  }

  setTab(tab: StatusTab): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.applyFilter();
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter(): void {
    let result = this.activeTab === 'all'
      ? this.members
      : this.members.filter(m => m.status === this.activeTab);

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(m =>
        m.first_name?.toLowerCase().includes(term) ||
        m.last_name?.toLowerCase().includes(term) ||
        m.email?.toLowerCase().includes(term) ||
        m.membership_number?.toString().toLowerCase().includes(term)
      );
    }

    this.filteredMembers = result;
    this.totalLength = result.length;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.updatePaginatedMembers();
  }

  updatePaginatedMembers(): void {
     if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    this.paginatedMembers = this.filteredMembers.slice(startIndex, endIndex);
  }

  getDisplayedPages(): (number | '...')[] {
    const pages: (number | '...')[] = [];

    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (this.currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(2, this.currentPage - 2);
    const end = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (this.currentPage < this.totalPages - 3) {
      pages.push('...');
    }

    pages.push(this.totalPages);

    return pages;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePaginatedMembers();
  }


  deleteMember(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.delete(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.members = this.members.filter(m => m.id !== id);
            this.applyFilter();
            Swal.fire('Deleted!', 'Member has been deleted.', 'success');
          });
      }
    });
  }

  quickVerify(member: Member): void {
    Swal.fire({
      title: `Verify ${member.first_name} ${member.last_name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Verify',
      confirmButtonColor: '#198754',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.verify(member.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.updateMemberInList(updated);
            this.toast('success', 'Member verified successfully');
          });
      }
    });
  }

  quickReject(member: Member): void {
    Swal.fire({
      title: `Reject ${member.first_name} ${member.last_name}?`,
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      confirmButtonColor: '#dc3545',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.reject(member.id, result.value || '')
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.updateMemberInList(updated);
            this.toast('success', 'Member rejected');
          });
      }
    });
  }

  quickSuspend(member: Member): void {
    Swal.fire({
      title: `Suspend ${member.first_name} ${member.last_name}?`,
      input: 'textarea',
      inputLabel: 'Reason for suspension',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Suspend',
      confirmButtonColor: '#fd7e14',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.suspend(member.id, result.value || '')
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.updateMemberInList(updated);
            this.toast('success', 'Member suspended');
          });
      }
    });
  }

  quickReactivate(member: Member): void {
    Swal.fire({
      title: `Reactivate ${member.first_name} ${member.last_name}?`,
      text: 'Status will return to Pending Review.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reactivate',
      confirmButtonColor: '#0d6efd',
    }).then(result => {
      if (result.isConfirmed) {
        this.memberService.reactivate(member.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(updated => {
            this.updateMemberInList(updated);
            this.toast('success', 'Member reactivated');
          });
      }
    });
  }

  quickResendInvite(member: Member): void {
    this.memberService.resendInvite(member.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.toast('success', 'Invite resent successfully'));
  }

  private updateMemberInList(updated: Member): void {
    const idx = this.members.findIndex(m => m.id === updated.id);
    if (idx !== -1) this.members[idx] = { ...this.members[idx], ...updated };
    this.applyFilter();
  }

  private toast(icon: 'success' | 'error' | 'warning', title: string): void {
    Swal.mixin({
      toast: true, position: 'top-end',
      showConfirmButton: false, timer: 2500, timerProgressBar: true,
    }).fire({ icon, title });
  }
}
