import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { MembershipTypeService } from 'src/app/shared/services/membership-type.service';
import { Membership } from 'src/app/shared/models/membership';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-view-membership',
    templateUrl: './view-membership.component.html',
    styleUrls: ['./view-membership.component.scss'],
    standalone: false
})

export class ViewMembershipComponent implements OnInit {
  id: number;
  membership: Membership;
  members: Member[] = [];
  paginatedMembers: Member[] = [];

  currentPage = 1;
  pageSize = 20;
  totalLength = 0;
  totalPages = 0;

  constructor(
    private membershipTypeService: MembershipTypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.membershipTypeService.find(this.id).subscribe((data: Membership) => {
      this.membership = data;
      this.members = data.members || [];

      this.totalLength = this.members.length;
      this.totalPages = Math.ceil(this.totalLength / this.pageSize);

      this.updatePaginatedMembers();
    });
  }

  // ✅ Ellipsis pagination
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

  // ✅ Single source of truth
  updatePaginatedMembers(): void {
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedMembers = this.members.slice(startIndex, endIndex);
  }

  // ✅ Safe page change
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePaginatedMembers();
  }
}